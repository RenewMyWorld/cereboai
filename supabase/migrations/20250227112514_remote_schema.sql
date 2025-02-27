

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "data_protection";


ALTER SCHEMA "data_protection" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "data_protection"."auto_encrypt_sensitive_columns"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $_$
DECLARE
    v_column_name TEXT;
    v_encrypted_value TEXT;
BEGIN
    -- List of columns to automatically encrypt
    FOREACH v_column_name IN ARRAY ARRAY[
        'email', 
        'phone_number', 
        'social_security_number', 
        'credit_card_number'
    ] LOOP
        -- Check if column exists and has a value
        IF TG_TABLE_NAME = 'users' AND 
           v_column_name = ANY(ARRAY['email', 'phone_number']) THEN
            
            EXECUTE format(
                'SELECT data_protection.encrypt_data($1.%I::TEXT)', 
                v_column_name
            ) INTO v_encrypted_value 
            USING NEW;

            EXECUTE format(
                'UPDATE %I.%I SET %I = $1 WHERE id = $2', 
                TG_TABLE_SCHEMA, 
                TG_TABLE_NAME, 
                v_column_name
            ) USING v_encrypted_value, NEW.id;
        END IF;
    END LOOP;

    RETURN NEW;
END;
$_$;


ALTER FUNCTION "data_protection"."auto_encrypt_sensitive_columns"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "data_protection"."decrypt_data"("p_encrypted_data" "text", "p_key_name" "text" DEFAULT 'default_symmetric_key'::"text") RETURNS "text"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_encryption_key TEXT;
BEGIN
    -- Retrieve the active encryption key
    SELECT encode(digest(key_name, 'sha256'), 'base64') INTO v_encryption_key
    FROM public.encryption_key_vault
    WHERE key_name = p_key_name AND is_active = true
    LIMIT 1;

    -- Decrypt the data
    RETURN decrypt(
        p_encrypted_data::bytea, 
        v_encryption_key::bytea, 
        'aes-cbc/pad:pkcs'
    )::TEXT;
END;
$$;


ALTER FUNCTION "data_protection"."decrypt_data"("p_encrypted_data" "text", "p_key_name" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "data_protection"."encrypt_data"("p_data" "text", "p_key_name" "text" DEFAULT 'default_symmetric_key'::"text") RETURNS "text"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_encryption_key TEXT;
BEGIN
    -- Retrieve the active encryption key
    SELECT encode(digest(key_name, 'sha256'), 'base64') INTO v_encryption_key
    FROM public.encryption_key_vault
    WHERE key_name = p_key_name AND is_active = true
    LIMIT 1;

    -- Encrypt the data using AES encryption
    RETURN encrypt(
        p_data::bytea, 
        v_encryption_key::bytea, 
        'aes-cbc/pad:pkcs'
    );
END;
$$;


ALTER FUNCTION "data_protection"."encrypt_data"("p_data" "text", "p_key_name" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "data_protection"."generate_encryption_key"("p_key_name" "text", "p_key_type" "text" DEFAULT 'SYMMETRIC'::"text", "p_key_length" integer DEFAULT 256) RETURNS "text"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_key TEXT;
    v_key_id INTEGER;
BEGIN
    -- Generate encryption key based on type
    CASE p_key_type
        WHEN 'SYMMETRIC' THEN
            v_key := encode(gen_salt('bf', 8) || gen_salt('md5'), 'base64');
        WHEN 'ASYMMETRIC' THEN
            v_key := gen_salt('bf');
        WHEN 'TRANSIT' THEN
            v_key := encode(gen_random_bytes(p_key_length / 8), 'base64');
        ELSE
            RAISE EXCEPTION 'Unsupported key type: %', p_key_type;
    END CASE;

    -- Insert key into encryption key vault
    INSERT INTO public.encryption_key_vault (
        key_name, 
        key_type, 
        metadata
    ) VALUES (
        p_key_name, 
        p_key_type,
        jsonb_build_object(
            'generation_method', 'pgcrypto',
            'key_length', p_key_length
        )
    ) RETURNING id INTO v_key_id;

    -- Log key generation event
    PERFORM public.log_security_event(
        'ENCRYPTION_KEY_GENERATED', 
        NULL, 
        jsonb_build_object(
            'key_name', p_key_name,
            'key_type', p_key_type,
            'key_id', v_key_id
        )
    );

    RETURN v_key;
END;
$$;


ALTER FUNCTION "data_protection"."generate_encryption_key"("p_key_name" "text", "p_key_type" "text", "p_key_length" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "data_protection"."mask_sensitive_data"("p_data" "text", "p_mask_type" "text" DEFAULT 'PARTIAL'::"text") RETURNS "text"
    LANGUAGE "plpgsql" IMMUTABLE
    AS $_$
BEGIN
    CASE p_mask_type
        WHEN 'PARTIAL' THEN
            -- Mask all but last 4 characters
            RETURN repeat('*', length(p_data) - 4) || 
                   substring(p_data, length(p_data) - 3);
        
        WHEN 'EMAIL' THEN
            -- Mask email addresses
            RETURN regexp_replace(
                p_data, 
                '^(.)(.*)(@.*)$', 
                '\1****\3'
            );
        
        WHEN 'PHONE' THEN
            -- Mask phone numbers
            RETURN regexp_replace(
                p_data, 
                '^(\+?[0-9]{2})[0-9]{6}([0-9]{2})$', 
                '\1******\2'
            );
        
        ELSE
            -- Default to full masking
            RETURN repeat('*', length(p_data));
    END CASE;
END;
$_$;


ALTER FUNCTION "data_protection"."mask_sensitive_data"("p_data" "text", "p_mask_type" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "data_protection"."rotate_encryption_key"("p_key_name" "text") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_new_key TEXT;
    v_old_key_id INTEGER;
    v_new_key_id INTEGER;
BEGIN
    -- Start a transaction
    BEGIN
        -- Disable the current active key
        UPDATE public.encryption_key_vault
        SET is_active = false, rotated_at = NOW()
        WHERE key_name = p_key_name AND is_active = true
        RETURNING id INTO v_old_key_id;

        -- Generate a new encryption key
        v_new_key := data_protection.generate_encryption_key(
            p_key_name, 
            'SYMMETRIC', 
            256
        );

        -- Log key rotation event
        PERFORM public.log_security_event(
            'ENCRYPTION_KEY_ROTATED', 
            NULL, 
            jsonb_build_object(
                'key_name', p_key_name,
                'old_key_id', v_old_key_id,
                'new_key_id', v_new_key_id
            )
        );

        RETURN true;
    EXCEPTION 
        WHEN OTHERS THEN
            -- Log any errors during key rotation
            PERFORM public.log_security_risk(
                'KEY_ROTATION_FAILED', 
                'CRITICAL', 
                'Failed to rotate encryption key',
                jsonb_build_object(
                    'key_name', p_key_name,
                    'error_message', SQLERRM
                )
            );
            RETURN false;
    END;
END;
$$;


ALTER FUNCTION "data_protection"."rotate_encryption_key"("p_key_name" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."check_compliance_violations"() RETURNS TABLE("violation_id" "uuid", "violation_type" "text", "violation_severity" "text", "violation_details" "jsonb", "detected_at" timestamp with time zone)
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
    RETURN QUERY
    WITH potential_violations AS (
        -- Check for suspicious login patterns
        SELECT 
            gen_random_uuid() AS violation_id,
            'SUSPICIOUS_LOGIN' AS violation_type,
            'HIGH' AS violation_severity,
            jsonb_build_object(
                'user_id', user_id,
                'login_count', COUNT(*),
                'unique_ips', COUNT(DISTINCT actor_ip)
            ) AS violation_details,
            MAX(event_timestamp) AS detected_at
        FROM public.comprehensive_audit_log
        WHERE 
            event_type = 'USER_LOGIN' AND 
            event_timestamp > NOW() - INTERVAL '1 hour'
        GROUP BY user_id
        HAVING 
            COUNT(*) > 10 OR 
            COUNT(DISTINCT actor_ip) > 3

        UNION

        -- Check for potential data exfiltration
        SELECT 
            gen_random_uuid(),
            'POTENTIAL_DATA_EXFILTRATION',
            'CRITICAL',
            jsonb_build_object(
                'user_id', user_id,
                'data_access_count', COUNT(*),
                'unique_resources', COUNT(DISTINCT resource_id)
            ),
            MAX(event_timestamp)
        FROM public.comprehensive_audit_log
        WHERE 
            event_type = 'DATA_ACCESS' AND 
            event_timestamp > NOW() - INTERVAL '1 day'
        GROUP BY user_id
        HAVING 
            COUNT(*) > 100 OR 
            COUNT(DISTINCT resource_id) > 50

        UNION

        -- Check for privilege escalation attempts
        SELECT 
            gen_random_uuid(),
            'PRIVILEGE_ESCALATION_ATTEMPT',
            'CRITICAL',
            jsonb_build_object(
                'user_id', user_id,
                'escalation_attempts', COUNT(*)
            ),
            MAX(event_timestamp)
        FROM public.comprehensive_audit_log
        WHERE 
            event_type = 'ROLE_CHANGE' AND 
            event_severity = 'ERROR'
        GROUP BY user_id
        HAVING COUNT(*) > 3
    )
    SELECT * FROM potential_violations;
END;
$$;


ALTER FUNCTION "public"."check_compliance_violations"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."check_membership_access"("required_tier" "text"[]) RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  user_tier TEXT;
BEGIN
  -- Get current user's membership tier
  SELECT membership_tier INTO user_tier 
  FROM public.users 
  WHERE id = auth.uid();

  -- Check if user's tier is in the required tiers
  RETURN user_tier = ANY(required_tier);
END;
$$;


ALTER FUNCTION "public"."check_membership_access"("required_tier" "text"[]) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."check_password_complexity"("password" "text") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $_$
DECLARE
    config RECORD;
BEGIN
    -- Fetch current password complexity configurations
    SELECT 
        config_value::INTEGER AS min_length,
        (config_value = 'true') AS require_uppercase,
        (config_value = 'true') AS require_lowercase,
        (config_value = 'true') AS require_number,
        (config_value = 'true') AS require_special_char
    INTO config
    FROM public.security_configuration
    WHERE config_key IN (
        'password_min_length', 
        'password_require_uppercase', 
        'password_require_lowercase', 
        'password_require_number', 
        'password_require_special_char'
    );

    -- Perform password complexity checks
    RETURN 
        length(password) >= config.min_length AND
        (NOT config.require_uppercase OR password ~ '[A-Z]') AND
        (NOT config.require_lowercase OR password ~ '[a-z]') AND
        (NOT config.require_number OR password ~ '[0-9]') AND
        (NOT config.require_special_char OR password ~ '[!@#$%^&*(),.?":{}|<>]');
END;
$_$;


ALTER FUNCTION "public"."check_password_complexity"("password" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."cleanup_inactive_sessions"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    -- Remove sessions older than 30 days or inactive for more than 24 hours
    DELETE FROM public.user_sessions
    WHERE 
        login_time < NOW() - INTERVAL '30 days' OR 
        (is_active = false AND last_activity < NOW() - INTERVAL '24 hours');
    
    RETURN NULL;
END;
$$;


ALTER FUNCTION "public"."cleanup_inactive_sessions"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."create_user_access_control"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
    -- Insert a default access control record for new users
    INSERT INTO public.user_access_control (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;

    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."create_user_access_control"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."detect_potential_threats"() RETURNS TABLE("threat_id" "uuid", "threat_type" "text", "threat_severity" "text", "threat_details" "jsonb", "detected_at" timestamp with time zone)
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
    RETURN QUERY
    WITH potential_threats AS (
        -- Detect brute force login attempts
        SELECT 
            gen_random_uuid() AS threat_id,
            'BRUTE_FORCE_LOGIN' AS threat_type,
            'HIGH' AS threat_severity,
            jsonb_build_object(
                'user_id', user_id,
                'failed_attempts', COUNT(*),
                'unique_ips', COUNT(DISTINCT actor_ip)
            ) AS threat_details,
            MAX(event_timestamp) AS detected_at
        FROM public.comprehensive_audit_log
        WHERE 
            event_type = 'LOGIN_FAILED' AND 
            event_timestamp > NOW() - INTERVAL '15 minutes'
        GROUP BY user_id
        HAVING 
            COUNT(*) > 5 OR 
            COUNT(DISTINCT actor_ip) > 2

        UNION

        -- Detect potential SQL injection patterns
        SELECT 
            gen_random_uuid(),
            'SQL_INJECTION_ATTEMPT',
            'CRITICAL',
            jsonb_build_object(
                'user_id', user_id,
                'suspicious_queries', COUNT(*),
                'matched_patterns', array_agg(DISTINCT resource_id)
            ),
            MAX(event_timestamp)
        FROM public.comprehensive_audit_log
        WHERE 
            event_type = 'DATABASE_QUERY' AND 
            (
                event_details->>'query' LIKE '%---%' OR
                event_details->>'query' LIKE '%/*%' OR
                event_details->>'query' LIKE '%UNION%' OR
                event_details->>'query' LIKE '%SELECT%' 
            )
        GROUP BY user_id
        HAVING COUNT(*) > 3

        UNION

        -- Detect potential cross-site scripting (XSS) attempts
        SELECT 
            gen_random_uuid(),
            'XSS_ATTEMPT',
            'HIGH',
            jsonb_build_object(
                'user_id', user_id,
                'suspicious_inputs', COUNT(*),
                'matched_patterns', array_agg(DISTINCT resource_id)
            ),
            MAX(event_timestamp)
        FROM public.comprehensive_audit_log
        WHERE 
            event_type = 'USER_INPUT' AND 
            (
                event_details->>'input' LIKE '%<%' OR
                event_details->>'input' LIKE '%>%' OR
                event_details->>'input' LIKE '%script%' OR
                event_details->>'input' LIKE '%javascript%'
            )
        GROUP BY user_id
        HAVING COUNT(*) > 3

        UNION

        -- Detect potential data exfiltration
        SELECT 
            gen_random_uuid(),
            'POTENTIAL_DATA_EXFILTRATION',
            'CRITICAL',
            jsonb_build_object(
                'user_id', user_id,
                'data_access_volume', COUNT(*),
                'unique_resources', COUNT(DISTINCT resource_id)
            ),
            MAX(event_timestamp)
        FROM public.comprehensive_audit_log
        WHERE 
            event_type = 'DATA_ACCESS' AND 
            event_timestamp > NOW() - INTERVAL '1 hour'
        GROUP BY user_id
        HAVING 
            COUNT(*) > 50 OR 
            COUNT(DISTINCT resource_id) > 10
    )
    SELECT * FROM potential_threats;
END;
$$;


ALTER FUNCTION "public"."detect_potential_threats"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."diagnose_auth_configuration"() RETURNS TABLE("setting_name" "text", "setting_value" "text")
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
        'auth.email_confirmations' AS setting_name, 
        current_setting('auth.email_confirmations', true) AS setting_value
    UNION ALL
    SELECT 
        'auth.signup_enabled', 
        current_setting('auth.signup_enabled', true)
    UNION ALL
    SELECT 
        'auth.password_min_length', 
        current_setting('auth.password_min_length', true)
    UNION ALL
    SELECT 
        'auth.password_complexity', 
        current_setting('auth.password_complexity', true)
    UNION ALL
    SELECT 
        'auth.max_login_attempts', 
        current_setting('auth.max_login_attempts', true);
END;
$$;


ALTER FUNCTION "public"."diagnose_auth_configuration"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."diagnose_signup_blockers"() RETURNS TABLE("blocker_type" "text", "blocker_details" "jsonb")
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
    RETURN QUERY
    WITH potential_blockers AS (
        -- Check for RLS policies that might block signup
        SELECT 
            'RLS_POLICY' AS blocker_type,
            jsonb_build_object(
                'table_name', schemaname || '.' || tablename,
                'policy_count', COUNT(*)
            ) AS blocker_details
        FROM pg_policies
        WHERE schemaname = 'auth' AND tablename = 'users'
        GROUP BY schemaname, tablename
        HAVING COUNT(*) > 0

        UNION

        -- Check for constraints on auth.users
        SELECT 
            'TABLE_CONSTRAINT',
            jsonb_build_object(
                'constraint_name', constraint_name,
                'constraint_type', constraint_type
            )
        FROM information_schema.table_constraints
        WHERE 
            table_schema = 'auth' AND 
            table_name = 'users' AND 
            constraint_type != 'PRIMARY KEY'

        UNION

        -- Check for trigger blocking signup
        SELECT 
            'SIGNUP_TRIGGER',
            jsonb_build_object(
                'trigger_name', trigger_name,
                'event_manipulation', event_manipulation
            )
        FROM information_schema.triggers
        WHERE 
            event_object_schema = 'auth' AND 
            event_object_table = 'users' AND 
            action_timing = 'BEFORE' AND 
            event_manipulation IN ('INSERT', 'UPDATE')
    )
    SELECT * FROM potential_blockers;
END;
$$;


ALTER FUNCTION "public"."diagnose_signup_blockers"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."enforce_password_complexity"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
    IF NOT public.check_password_complexity(NEW.password_hash) THEN
        RAISE EXCEPTION 'Password does not meet complexity requirements';
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."enforce_password_complexity"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."flexible_user_signup"("p_email" "text", "p_password" "text") RETURNS "uuid"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $_$
DECLARE
    v_user_id UUID;
BEGIN
    -- Use dynamic SQL to insert user with minimal required fields
    EXECUTE format('
        INSERT INTO auth.users (
            email, 
            encrypted_password, 
            email_confirmed_at,
            last_sign_in_at,
            %s
        ) VALUES (
            $1, 
            crypt($2, gen_salt(''bf'')), 
            NOW(),
            NOW(),
            %s
        ) RETURNING id',
        -- Dynamically handle optional columns
        (
            SELECT string_agg(column_name, ', ')
            FROM information_schema.columns
            WHERE 
                table_schema = 'auth' AND 
                table_name = 'users' AND 
                column_name NOT IN (
                    'id', 'email', 'encrypted_password', 
                    'email_confirmed_at', 'last_sign_in_at'
                )
        ),
        -- Provide default values for optional columns
        (
            SELECT string_agg(
                CASE 
                    WHEN data_type = 'boolean' THEN 'false'
                    WHEN data_type IN ('integer', 'bigint', 'smallint') THEN '0'
                    WHEN data_type = 'text' THEN '''''::text'
                    WHEN data_type = 'uuid' THEN 'NULL::uuid'
                    ELSE 'NULL'
                END, 
                ', '
            )
            FROM information_schema.columns
            WHERE 
                table_schema = 'auth' AND 
                table_name = 'users' AND 
                column_name NOT IN (
                    'id', 'email', 'encrypted_password', 
                    'email_confirmed_at', 'last_sign_in_at'
                )
        )
    ) USING p_email, p_password INTO v_user_id;

    RETURN v_user_id;
END;
$_$;


ALTER FUNCTION "public"."flexible_user_signup"("p_email" "text", "p_password" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."force_enable_signup"() RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
    -- Attempt to enable signup through multiple methods
    
    -- Method 1: Direct configuration update
    PERFORM set_config('auth.signup_enabled', 'true', false);
    
    -- Method 2: Update auth.users table
    UPDATE auth.users 
    SET signup_enabled = true 
    WHERE signup_enabled IS NULL OR signup_enabled = false;
    
    -- Method 3: Log the action
    PERFORM public.log_comprehensive_audit(
        'SIGNUP_FORCIBLY_ENABLED',
        'WARNING',
        NULL,
        jsonb_build_object(
            'method', 'force_enable_signup',
            'timestamp', NOW()
        )
    );
END;
$$;


ALTER FUNCTION "public"."force_enable_signup"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."force_user_signup"("p_email" "text", "p_password" "text", "p_user_metadata" "jsonb" DEFAULT NULL::"jsonb") RETURNS "uuid"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_user_id UUID;
    v_signup_attempt_id UUID;
BEGIN
    -- Log signup attempt
    v_signup_attempt_id := public.log_comprehensive_audit(
        'USER_SIGNUP_ATTEMPT',
        'INFO',
        NULL,
        jsonb_build_object(
            'email', p_email,
            'metadata', p_user_metadata
        )
    );

    -- Attempt to insert user directly
    BEGIN
        INSERT INTO auth.users (
            email, 
            encrypted_password, 
            email_confirmed_at,
            last_sign_in_at,
            user_metadata
        ) VALUES (
            p_email,
            crypt(p_password, gen_salt('bf')),
            NOW(),
            NOW(),
            COALESCE(p_user_metadata, '{}'::jsonb)
        ) RETURNING id INTO v_user_id;

        -- Log successful signup
        PERFORM public.log_comprehensive_audit(
            'USER_SIGNUP_SUCCESS',
            'INFO',
            v_user_id,
            jsonb_build_object(
                'signup_attempt_id', v_signup_attempt_id,
                'email', p_email
            )
        );

        RETURN v_user_id;
    EXCEPTION 
        WHEN OTHERS THEN
            -- Log signup failure
            PERFORM public.log_comprehensive_audit(
                'USER_SIGNUP_FAILURE',
                'ERROR',
                NULL,
                jsonb_build_object(
                    'signup_attempt_id', v_signup_attempt_id,
                    'email', p_email,
                    'error_message', SQLERRM
                )
            );
            
            RAISE;
    END;
END;
$$;


ALTER FUNCTION "public"."force_user_signup"("p_email" "text", "p_password" "text", "p_user_metadata" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."generate_compliance_report"("p_start_date" timestamp with time zone DEFAULT ("now"() - '30 days'::interval), "p_end_date" timestamp with time zone DEFAULT "now"()) RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_report JSONB;
BEGIN
    -- Generate comprehensive compliance report
    v_report := jsonb_build_object(
        'report_period', jsonb_build_object(
            'start_date', p_start_date,
            'end_date', p_end_date
        ),
        'event_summary', (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'event_type', event_type,
                    'total_events', COUNT(*),
                    'unique_users', COUNT(DISTINCT user_id),
                    'severity_distribution', (
                        SELECT jsonb_object_agg(severity, count)
                        FROM (
                            SELECT event_severity AS severity, COUNT(*) AS count
                            FROM public.comprehensive_audit_log
                            WHERE 
                                event_timestamp BETWEEN p_start_date AND p_end_date
                            GROUP BY event_severity
                        ) severity_counts
                    )
                )
            )
            FROM public.comprehensive_audit_log
            WHERE event_timestamp BETWEEN p_start_date AND p_end_date
            GROUP BY event_type
        ),
        'compliance_violations', (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'violation_type', violation_type,
                    'violation_count', COUNT(*),
                    'severity', MAX(violation_severity)
                )
            )
            FROM public.check_compliance_violations()
        )
    );

    -- Log report generation
    PERFORM public.log_comprehensive_audit(
        'COMPLIANCE_REPORT_GENERATED',
        'INFO',
        NULL,
        v_report
    );

    RETURN v_report;
END;
$$;


ALTER FUNCTION "public"."generate_compliance_report"("p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_user_membership_tier"("user_id" "uuid") RETURNS "text"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    current_tier TEXT;
BEGIN
    SELECT membership_tier INTO current_tier
    FROM public.users
    WHERE id = user_id;
    
    RETURN COALESCE(current_tier, 'Standard Member');
END;
$$;


ALTER FUNCTION "public"."get_user_membership_tier"("user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  -- Prevent duplicate entries
  IF NOT EXISTS (SELECT 1 FROM public.users WHERE id = NEW.id) THEN
    -- Insert a new row into public.users when a new user signs up
    INSERT INTO public.users (
      id, 
      email, 
      username, 
      membership_tier,
      storage_limit,
      created_at
    )
    VALUES (
      NEW.id, 
      NEW.email, 
      LOWER(SPLIT_PART(NEW.email, '@', 1)), 
      'Standard Member',
      10, -- Default storage limit
      NOW()
    );
  END IF;
  
  -- Log user creation activity
  PERFORM log_user_activity(
    NEW.id, 
    'user_signup', 
    json_build_object(
      'email', NEW.email,
      'signup_method', COALESCE(
        (NEW.raw_app_meta_data->>'provider')::text, 
        'email'
      )
    )
  );
  
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."log_auth_config_changes"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    PERFORM public.log_comprehensive_audit(
        'AUTH_CONFIG_CHANGED',
        'INFO',
        NULL,
        jsonb_build_object(
            'setting_name', TG_ARGV[0],
            'old_value', OLD.value,
            'new_value', NEW.value
        )
    );
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."log_auth_config_changes"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."log_auth_event"("p_event_type" "text", "p_user_id" "uuid" DEFAULT NULL::"uuid", "p_details" "jsonb" DEFAULT NULL::"jsonb") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
    PERFORM public.log_comprehensive_audit(
        p_event_type,
        CASE 
            WHEN p_event_type LIKE '%ERROR%' THEN 'ERROR'
            WHEN p_event_type LIKE '%FAILED%' THEN 'WARNING'
            ELSE 'INFO'
        END,
        p_user_id,
        p_details
    );
END;
$$;


ALTER FUNCTION "public"."log_auth_event"("p_event_type" "text", "p_user_id" "uuid", "p_details" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."log_comprehensive_audit"("p_event_type" "text", "p_event_severity" "text" DEFAULT 'INFO'::"text", "p_user_id" "uuid" DEFAULT NULL::"uuid", "p_event_details" "jsonb" DEFAULT NULL::"jsonb", "p_service_name" "text" DEFAULT NULL::"text", "p_action_category" "text" DEFAULT NULL::"text", "p_resource_type" "text" DEFAULT NULL::"text", "p_resource_id" "text" DEFAULT NULL::"text") RETURNS "uuid"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_correlation_id UUID;
    v_geo_location JSONB;
    v_device_info JSONB;
BEGIN
    -- Generate correlation ID
    v_correlation_id := gen_random_uuid();

    -- Attempt to get geolocation (mock implementation)
    v_geo_location := jsonb_build_object(
        'country', inet_client_addr()::text,
        'region', 'Unknown',
        'city', 'Unknown'
    );

    -- Attempt to get device information (mock implementation)
    v_device_info := jsonb_build_object(
        'user_agent', current_setting('application_name', true),
        'platform', 'Unknown',
        'browser', 'Unknown'
    );

    -- Insert comprehensive audit log entry
    INSERT INTO public.comprehensive_audit_log (
        event_type,
        event_severity,
        user_id,
        actor_ip,
        user_agent,
        service_name,
        action_category,
        resource_type,
        resource_id,
        event_details,
        correlation_id,
        geo_location,
        device_fingerprint,
        is_sensitive
    ) VALUES (
        p_event_type,
        p_event_severity,
        p_user_id,
        inet_client_addr(),
        current_setting('application_name', true),
        p_service_name,
        p_action_category,
        p_resource_type,
        p_resource_id,
        p_event_details,
        v_correlation_id,
        v_geo_location,
        md5(v_device_info::text),
        CASE 
            WHEN p_event_severity IN ('CRITICAL', 'ERROR') THEN true
            ELSE false
        END
    );

    RETURN v_correlation_id;
END;
$$;


ALTER FUNCTION "public"."log_comprehensive_audit"("p_event_type" "text", "p_event_severity" "text", "p_user_id" "uuid", "p_event_details" "jsonb", "p_service_name" "text", "p_action_category" "text", "p_resource_type" "text", "p_resource_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."log_security_event"("event_type" "text", "user_id" "uuid" DEFAULT NULL::"uuid", "event_details" "jsonb" DEFAULT '{}'::"jsonb") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
    -- Only log if security audit logging is enabled
    IF (SELECT config_value FROM public.security_configuration WHERE config_key = 'enable_security_audit_log') = 'true' THEN
        INSERT INTO public.user_activity_log (
            user_id, 
            action_type, 
            action_details
        ) VALUES (
            user_id, 
            'SECURITY_' || event_type, 
            event_details
        );
    END IF;
END;
$$;


ALTER FUNCTION "public"."log_security_event"("event_type" "text", "user_id" "uuid", "event_details" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."log_security_risk"("p_risk_type" "text", "p_risk_severity" "text", "p_description" "text", "p_notes" "jsonb" DEFAULT NULL::"jsonb") RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_risk_id INTEGER;
BEGIN
    INSERT INTO public.security_risk_log (
        risk_type, 
        risk_severity, 
        description, 
        notes
    ) VALUES (
        p_risk_type, 
        p_risk_severity, 
        p_description, 
        p_notes
    ) RETURNING id INTO v_risk_id;

    -- Automatically log critical and high-severity risks to user activity log
    IF p_risk_severity IN ('CRITICAL', 'HIGH') THEN
        PERFORM public.log_security_event(
            'SECURITY_RISK_DETECTED', 
            NULL, 
            jsonb_build_object(
                'risk_id', v_risk_id,
                'risk_type', p_risk_type,
                'risk_severity', p_risk_severity,
                'description', p_description
            )
        );
    END IF;

    RETURN v_risk_id;
END;
$$;


ALTER FUNCTION "public"."log_security_risk"("p_risk_type" "text", "p_risk_severity" "text", "p_description" "text", "p_notes" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."log_user_activity"("p_user_id" "uuid", "p_action_type" "text", "p_action_details" "jsonb") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.user_activity_log (user_id, action_type, action_details)
  VALUES (p_user_id, p_action_type, p_action_details);
END;
$$;


ALTER FUNCTION "public"."log_user_activity"("p_user_id" "uuid", "p_action_type" "text", "p_action_details" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."manage_audit_log_retention"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    -- Purge audit logs beyond retention period
    DELETE FROM public.comprehensive_audit_log
    WHERE 
        event_timestamp < NOW() - retention_period OR
        (is_sensitive = true AND event_timestamp < NOW() - INTERVAL '30 days');
    
    RETURN NULL;
END;
$$;


ALTER FUNCTION "public"."manage_audit_log_retention"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."manage_security_policy"("p_table_name" "text", "p_policy_type" "text", "p_policy_definition" "jsonb") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_policy_name TEXT;
BEGIN
    -- Validate input
    IF p_table_name IS NULL OR p_policy_type IS NULL THEN
        RAISE EXCEPTION 'Table name and policy type must be provided';
    END IF;

    -- Generate a standardized policy name
    v_policy_name := format('%s_%s_policy', p_table_name, p_policy_type);

    -- Dynamic policy creation based on type
    CASE p_policy_type
        WHEN 'SELECT' THEN
            EXECUTE format('
                CREATE POLICY %I ON public.%I FOR SELECT
                USING (%s)', 
                v_policy_name, 
                p_table_name, 
                p_policy_definition->>'using_clause'
            );
        WHEN 'INSERT' THEN
            EXECUTE format('
                CREATE POLICY %I ON public.%I FOR INSERT
                WITH CHECK (%s)', 
                v_policy_name, 
                p_table_name, 
                p_policy_definition->>'check_clause'
            );
        WHEN 'UPDATE' THEN
            EXECUTE format('
                CREATE POLICY %I ON public.%I FOR UPDATE
                USING (%s)
                WITH CHECK (%s)', 
                v_policy_name, 
                p_table_name, 
                p_policy_definition->>'using_clause',
                p_policy_definition->>'check_clause'
            );
        WHEN 'DELETE' THEN
            EXECUTE format('
                CREATE POLICY %I ON public.%I FOR DELETE
                USING (%s)', 
                v_policy_name, 
                p_table_name, 
                p_policy_definition->>'using_clause'
            );
        ELSE
            RAISE EXCEPTION 'Unsupported policy type: %', p_policy_type;
    END CASE;

    RETURN TRUE;
EXCEPTION 
    WHEN OTHERS THEN
        -- Log the error
        PERFORM public.log_security_risk(
            'POLICY_CREATION_FAILED', 
            'HIGH', 
            format('Failed to create security policy for table %s: %s', 
                   p_table_name, SQLERRM),
            jsonb_build_object(
                'table_name', p_table_name,
                'policy_type', p_policy_type,
                'error_message', SQLERRM
            )
        );
        RETURN FALSE;
END;
$$;


ALTER FUNCTION "public"."manage_security_policy"("p_table_name" "text", "p_policy_type" "text", "p_policy_definition" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."manage_user_access_control"("p_user_id" "uuid", "p_action" "text", "p_params" "jsonb" DEFAULT NULL::"jsonb") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_result JSONB;
    v_current_record public.user_access_control%ROWTYPE;
BEGIN
    -- Retrieve current access control record
    SELECT * INTO v_current_record 
    FROM public.user_access_control 
    WHERE user_id = p_user_id;

    -- Handle different access control actions
    CASE p_action
        WHEN 'ENABLE_MFA' THEN
            -- Enable Multi-Factor Authentication
            UPDATE public.user_access_control
            SET 
                mfa_enabled = true,
                mfa_method = COALESCE(p_params->>'mfa_method', 'TOTP'),
                updated_at = NOW()
            WHERE user_id = p_user_id
            RETURNING jsonb_build_object(
                'mfa_enabled', true,
                'mfa_method', mfa_method
            ) INTO v_result;

        WHEN 'UPDATE_GEO_RESTRICTIONS' THEN
            -- Update geolocation-based access controls
            UPDATE public.user_access_control
            SET 
                allowed_countries = COALESCE((p_params->>'allowed_countries')::TEXT[], allowed_countries),
                blocked_countries = COALESCE((p_params->>'blocked_countries')::TEXT[], blocked_countries),
                allowed_ip_ranges = COALESCE((p_params->>'allowed_ip_ranges')::CIDR[], allowed_ip_ranges),
                blocked_ip_ranges = COALESCE((p_params->>'blocked_ip_ranges')::CIDR[], blocked_ip_ranges),
                updated_at = NOW()
            WHERE user_id = p_user_id
            RETURNING jsonb_build_object(
                'allowed_countries', allowed_countries,
                'blocked_countries', blocked_countries,
                'allowed_ip_ranges', allowed_ip_ranges,
                'blocked_ip_ranges', blocked_ip_ranges
            ) INTO v_result;

        WHEN 'UPDATE_SESSION_CONTROLS' THEN
            -- Update session-related controls
            UPDATE public.user_access_control
            SET 
                max_concurrent_sessions = COALESCE((p_params->>'max_concurrent_sessions')::INTEGER, max_concurrent_sessions),
                session_timeout_minutes = COALESCE((p_params->>'session_timeout_minutes')::INTEGER, session_timeout_minutes),
                updated_at = NOW()
            WHERE user_id = p_user_id
            RETURNING jsonb_build_object(
                'max_concurrent_sessions', max_concurrent_sessions,
                'session_timeout_minutes', session_timeout_minutes
            ) INTO v_result;

        WHEN 'ASSESS_RISK' THEN
            -- Dynamically assess and update user risk score
            UPDATE public.user_access_control
            SET 
                risk_score = (
                    CASE 
                        WHEN last_login_at IS NULL THEN 10  -- New account
                        WHEN age(NOW(), last_login_at) < INTERVAL '7 days' THEN 20  -- Recent activity
                        WHEN mfa_enabled = false THEN 30  -- No MFA
                        ELSE 5  -- Low risk
                    END
                ),
                updated_at = NOW()
            WHERE user_id = p_user_id
            RETURNING jsonb_build_object(
                'risk_score', risk_score,
                'last_login_at', last_login_at
            ) INTO v_result;

        WHEN 'COMPLIANCE_HOLD' THEN
            -- Place user on compliance hold
            UPDATE public.user_access_control
            SET 
                is_compliance_hold = true,
                compliance_notes = COALESCE(p_params->>'compliance_notes', 'Administrative hold'),
                updated_at = NOW()
            WHERE user_id = p_user_id
            RETURNING jsonb_build_object(
                'is_compliance_hold', true,
                'compliance_notes', compliance_notes
            ) INTO v_result;

        ELSE
            RAISE EXCEPTION 'Invalid action: %', p_action;
    END CASE;

    -- Log the access control action
    PERFORM public.log_security_event(
        'USER_ACCESS_CONTROL', 
        p_user_id, 
        jsonb_build_object(
            'action', p_action,
            'details', v_result
        )
    );

    RETURN v_result;
END;
$$;


ALTER FUNCTION "public"."manage_user_access_control"("p_user_id" "uuid", "p_action" "text", "p_params" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."manage_user_session"("p_user_id" "uuid", "p_action" "text", "p_session_token" "text" DEFAULT NULL::"text", "p_device_info" "jsonb" DEFAULT NULL::"jsonb") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_session_id UUID;
    v_result JSONB;
BEGIN
    CASE p_action
        WHEN 'CREATE' THEN
            -- Create a new user session
            INSERT INTO public.user_sessions (
                user_id, 
                session_token, 
                ip_address, 
                user_agent,
                device_info
            ) VALUES (
                p_user_id,
                p_session_token,
                inet_client_addr(),
                current_setting('application_name', true),
                p_device_info
            ) RETURNING id, session_token INTO v_session_id, v_result;

        WHEN 'TERMINATE' THEN
            -- Terminate a specific session
            UPDATE public.user_sessions
            SET 
                is_active = false, 
                last_activity = NOW()
            WHERE 
                user_id = p_user_id AND 
                session_token = p_session_token
            RETURNING id, session_token INTO v_session_id, v_result;

        WHEN 'TERMINATE_ALL' THEN
            -- Terminate all active sessions for a user
            UPDATE public.user_sessions
            SET 
                is_active = false, 
                last_activity = NOW()
            WHERE 
                user_id = p_user_id
            RETURNING jsonb_build_object(
                'terminated_sessions', COUNT(*)
            ) INTO v_result;

        ELSE
            RAISE EXCEPTION 'Invalid session management action: %', p_action;
    END CASE;

    -- Log the session management action
    PERFORM public.log_security_event(
        'USER_SESSION', 
        p_user_id, 
        jsonb_build_object(
            'action', p_action,
            'session_details', v_result
        )
    );

    RETURN v_result;
END;
$$;


ALTER FUNCTION "public"."manage_user_session"("p_user_id" "uuid", "p_action" "text", "p_session_token" "text", "p_device_info" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."mitigate_threat"("p_threat_id" "uuid", "p_threat_type" "text", "p_user_id" "uuid" DEFAULT NULL::"uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_mitigation_result JSONB;
    v_threat_record RECORD;
BEGIN
    -- Retrieve threat details
    SELECT * INTO v_threat_record
    FROM public.detect_potential_threats()
    WHERE threat_id = p_threat_id;

    -- Mitigation strategies based on threat type
    CASE p_threat_type
        WHEN 'BRUTE_FORCE_LOGIN' THEN
            -- Temporarily lock user account
            UPDATE auth.users
            SET 
                is_sso_locked = true,
                lockout_reason = 'Potential brute force attack'
            WHERE id = p_user_id;

            v_mitigation_result := jsonb_build_object(
                'action', 'ACCOUNT_LOCKED',
                'duration', '1 hour',
                'user_id', p_user_id
            );

        WHEN 'SQL_INJECTION_ATTEMPT' THEN
            -- Block IP and log security risk
            PERFORM public.log_security_risk(
                'SQL_INJECTION', 
                'CRITICAL', 
                'Potential SQL injection detected',
                v_threat_record.threat_details
            );

            v_mitigation_result := jsonb_build_object(
                'action', 'IP_BLOCK',
                'duration', '24 hours',
                'ip_address', inet_client_addr()
            );

        WHEN 'XSS_ATTEMPT' THEN
            -- Log security risk and sanitize input
            PERFORM public.log_security_risk(
                'XSS_ATTEMPT', 
                'HIGH', 
                'Potential Cross-Site Scripting detected',
                v_threat_record.threat_details
            );

            v_mitigation_result := jsonb_build_object(
                'action', 'INPUT_SANITIZATION',
                'affected_user_id', p_user_id
            );

        WHEN 'POTENTIAL_DATA_EXFILTRATION' THEN
            -- Trigger comprehensive security review
            PERFORM public.log_security_risk(
                'DATA_EXFILTRATION', 
                'CRITICAL', 
                'Potential large-scale data access detected',
                v_threat_record.threat_details
            );

            v_mitigation_result := jsonb_build_object(
                'action', 'SECURITY_REVIEW',
                'scope', 'FULL_SYSTEM',
                'affected_user_id', p_user_id
            );

        ELSE
            -- Unknown threat type
            v_mitigation_result := jsonb_build_object(
                'action', 'NO_MITIGATION',
                'reason', 'Unknown threat type'
            );
    END CASE;

    -- Log mitigation action
    PERFORM public.log_comprehensive_audit(
        'THREAT_MITIGATION',
        'CRITICAL',
        p_user_id,
        v_mitigation_result
    );

    RETURN v_mitigation_result;
END;
$$;


ALTER FUNCTION "public"."mitigate_threat"("p_threat_id" "uuid", "p_threat_type" "text", "p_user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."perform_security_scan"() RETURNS TABLE("scan_id" "uuid", "risk_count" integer, "critical_risks" integer, "high_risks" integer, "scan_timestamp" timestamp with time zone)
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_scan_id UUID := gen_random_uuid();
    v_risk_count INTEGER;
    v_critical_risks INTEGER;
    v_high_risks INTEGER;
BEGIN
    -- Scan for potential security risks in database configuration
    
    -- Check for overly permissive roles
    IF EXISTS (
        SELECT 1 
        FROM information_schema.role_table_grants 
        WHERE grantee IN ('PUBLIC', 'anon', 'authenticated') 
        AND privilege_type = 'ALL PRIVILEGES'
    ) THEN
        PERFORM public.log_security_risk(
            'ROLE_PERMISSIONS', 
            'HIGH', 
            'Overly permissive database role grants detected'
        );
    END IF;

    -- Check for sensitive data exposure in table columns
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE column_name ~* '(password|secret|token|key|credentials)'
        AND data_type = 'character varying'
    ) THEN
        PERFORM public.log_security_risk(
            'DATA_EXPOSURE', 
            'CRITICAL', 
            'Potential sensitive data exposure in database columns'
        );
    END IF;

    -- Check for missing Row Level Security
    IF EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
        AND (
            NOT EXISTS (
                SELECT 1 
                FROM information_schema.table_constraints 
                WHERE table_schema = 'public' 
                AND table_name = information_schema.tables.table_name 
                AND constraint_type = 'SECURITY POLICY'
            )
        )
    ) THEN
        PERFORM public.log_security_risk(
            'RLS_MISSING', 
            'HIGH', 
            'Tables without Row Level Security detected'
        );
    END IF;

    -- Aggregate risk statistics
    SELECT 
        COUNT(*) AS total_risks,
        COUNT(CASE WHEN risk_severity = 'CRITICAL' THEN 1 END) AS critical_risks,
        COUNT(CASE WHEN risk_severity = 'HIGH' THEN 1 END) AS high_risks
    INTO 
        v_risk_count, 
        v_critical_risks, 
        v_high_risks
    FROM public.security_risk_log 
    WHERE mitigation_status != 'MITIGATED';

    RETURN QUERY 
    SELECT 
        v_scan_id, 
        v_risk_count, 
        v_critical_risks, 
        v_high_risks, 
        NOW();
END;
$$;


ALTER FUNCTION "public"."perform_security_scan"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."reset_auth_configuration"() RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
    -- Reset signup to be enabled
    PERFORM set_config('auth.signup_enabled', 'true', false);
    
    -- Reset email confirmation requirements
    PERFORM set_config('auth.email_confirmations', 'false', false);
    
    -- Set reasonable password requirements
    PERFORM set_config('auth.password_min_length', '8', false);
    PERFORM set_config('auth.password_complexity', 'medium', false);
    
    -- Log the configuration reset
    PERFORM public.log_comprehensive_audit(
        'AUTH_CONFIG_RESET',
        'WARNING',
        NULL,
        jsonb_build_object(
            'action', 'Authentication settings reset',
            'previous_settings', (SELECT jsonb_agg(row_to_json(t)) FROM public.diagnose_auth_configuration() t)
        )
    );
END;
$$;


ALTER FUNCTION "public"."reset_auth_configuration"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."reset_auth_environment"() RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
    -- Disable email confirmations
    PERFORM set_config('auth.email_confirmations', 'off', false);
    
    -- Reset signup restrictions
    PERFORM set_config('auth.signup_enabled', 'on', false);
    
    -- Log the reset
    PERFORM public.log_comprehensive_audit(
        'AUTH_ENVIRONMENT_RESET',
        'WARNING',
        NULL,
        jsonb_build_object(
            'action', 'Authentication environment forcibly reset'
        )
    );
END;
$$;


ALTER FUNCTION "public"."reset_auth_environment"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."simplified_user_signup"("p_email" "text", "p_password" "text") RETURNS "uuid"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_user_id UUID;
BEGIN
    -- Directly insert user
    INSERT INTO auth.users (
        email, 
        encrypted_password, 
        email_confirmed_at,
        last_sign_in_at
    ) VALUES (
        p_email,
        crypt(p_password, gen_salt('bf')),
        NOW(),
        NOW()
    ) RETURNING id INTO v_user_id;

    RETURN v_user_id;
END;
$$;


ALTER FUNCTION "public"."simplified_user_signup"("p_email" "text", "p_password" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."trigger_periodic_security_scan"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    -- Perform security scan every 24 hours
    IF (TG_OP = 'INSERT' AND NEW.config_key = 'last_security_scan') THEN
        PERFORM public.perform_security_scan();
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."trigger_periodic_security_scan"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."trigger_threat_intelligence_update"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    -- Perform threat intelligence update every 24 hours
    IF (TG_OP = 'INSERT' AND NEW.config_key = 'last_threat_intel_update') THEN
        PERFORM public.update_threat_intelligence();
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."trigger_threat_intelligence_update"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_email_verification"("p_user_id" "uuid", "p_verification_status" boolean) RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  UPDATE public.users
  SET 
    email_verified = p_verification_status,
    last_email_verification_attempt = NOW()
  WHERE id = p_user_id;
END;
$$;


ALTER FUNCTION "public"."update_email_verification"("p_user_id" "uuid", "p_verification_status" boolean) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_threat_intelligence"() RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_known_threats JSONB := jsonb_build_array(
        -- Predefined threat signatures
        jsonb_build_object(
            'threat_type', 'SQL_INJECTION',
            'threat_signature', '[\-\-]|[\/\*]|\bUNION\b|\bSELECT\b',
            'severity', 'CRITICAL',
            'description', 'Common SQL injection patterns',
            'mitigation_strategy', jsonb_build_object(
                'input_validation', true,
                'parameterized_queries', true
            )
        ),
        jsonb_build_object(
            'threat_type', 'XSS',
            'threat_signature', '[<>]|script|javascript',
            'severity', 'HIGH',
            'description', 'Cross-Site Scripting patterns',
            'mitigation_strategy', jsonb_build_object(
                'input_sanitization', true,
                'output_encoding', true
            )
        )
    );
    v_threat JSONB;
BEGIN
    -- Iterate through known threats and update threat intelligence
    FOR v_threat IN SELECT * FROM jsonb_array_elements(v_known_threats) LOOP
        INSERT INTO public.threat_intelligence (
            threat_type,
            threat_signature,
            severity,
            description,
            mitigation_strategy
        ) VALUES (
            v_threat->>'threat_type',
            v_threat->>'threat_signature',
            v_threat->>'severity',
            v_threat->>'description',
            v_threat->'mitigation_strategy'
        ) ON CONFLICT (threat_signature) DO UPDATE
        SET 
            severity = EXCLUDED.severity,
            description = EXCLUDED.description,
            mitigation_strategy = EXCLUDED.mitigation_strategy,
            last_updated_at = NOW();
    END LOOP;

    -- Log threat intelligence update
    PERFORM public.log_comprehensive_audit(
        'THREAT_INTELLIGENCE_UPDATE',
        'INFO',
        NULL,
        jsonb_build_object(
            'threats_updated', jsonb_array_length(v_known_threats)
        )
    );
END;
$$;


ALTER FUNCTION "public"."update_threat_intelligence"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."upgrade_membership_tier"("p_new_tier" "text") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  current_tier TEXT;
BEGIN
  -- Get current user's membership tier
  SELECT membership_tier INTO current_tier 
  FROM public.users 
  WHERE id = auth.uid();

  -- Define tier upgrade rules
  IF p_new_tier IN ('Premium Member', 'Premium Developer') AND 
     current_tier IN ('Standard Member', 'Standard Developer') THEN
    
    UPDATE public.users
    SET 
      membership_tier = p_new_tier,
      storage_limit = (
        CASE 
          WHEN p_new_tier = 'Premium Member' THEN 50 
          WHEN p_new_tier = 'Premium Developer' THEN 100 
        END
      )
    WHERE id = auth.uid();
    
    -- Log tier upgrade activity
    PERFORM log_user_activity(
      auth.uid(), 
      'membership_upgrade', 
      json_build_object(
        'old_tier', current_tier,
        'new_tier', p_new_tier
      )
    );
    
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$;


ALTER FUNCTION "public"."upgrade_membership_tier"("p_new_tier" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."upgrade_membership_tier"("user_id" "uuid", "new_tier" "text") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    current_tier TEXT;
    allowed_upgrade BOOLEAN;
BEGIN
    -- Get current user tier
    SELECT membership_tier INTO current_tier
    FROM public.users
    WHERE id = user_id;

    -- Define upgrade paths (simplified example)
    allowed_upgrade = CASE 
        WHEN current_tier = 'Standard Member' AND 
             new_tier IN ('Premium Member', 'Standard Developer') THEN TRUE
        WHEN current_tier = 'Premium Member' AND 
             new_tier = 'Premium Developer' THEN TRUE
        WHEN current_tier = 'Standard Developer' AND 
             new_tier = 'Premium Developer' THEN TRUE
        WHEN current_tier = 'Premium Developer' AND 
             new_tier = 'Community Developer' THEN TRUE
        WHEN current_tier = 'Community Developer' AND 
             new_tier = 'Community SME' THEN TRUE
        ELSE FALSE
    END;

    IF allowed_upgrade THEN
        UPDATE public.users 
        SET membership_tier = new_tier 
        WHERE id = user_id;
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$;


ALTER FUNCTION "public"."upgrade_membership_tier"("user_id" "uuid", "new_tier" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."validate_user_access"("p_user_id" "uuid", "p_login_ip" "inet", "p_login_location" "jsonb") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_access_record public.user_access_control%ROWTYPE;
    v_current_sessions INTEGER;
BEGIN
    -- Retrieve user access control record
    SELECT * INTO v_access_record
    FROM public.user_access_control
    WHERE user_id = p_user_id;

    -- Check if user is on compliance hold
    IF v_access_record.is_compliance_hold THEN
        PERFORM public.log_security_risk(
            'ACCESS_DENIED', 
            'HIGH', 
            'Login attempt during compliance hold',
            jsonb_build_object('user_id', p_user_id)
        );
        RETURN false;
    END IF;

    -- Geolocation restrictions
    IF array_length(v_access_record.blocked_countries, 1) > 0 AND 
       (p_login_location->>'country')::TEXT = ANY(v_access_record.blocked_countries) THEN
        PERFORM public.log_security_risk(
            'GEO_RESTRICTION', 
            'MEDIUM', 
            'Login from blocked country',
            jsonb_build_object(
                'user_id', p_user_id, 
                'country', p_login_location->>'country'
            )
        );
        RETURN false;
    END IF;

    -- IP range restrictions
    IF array_length(v_access_record.blocked_ip_ranges, 1) > 0 AND 
       p_login_ip << ANY(v_access_record.blocked_ip_ranges) THEN
        PERFORM public.log_security_risk(
            'IP_RESTRICTION', 
            'MEDIUM', 
            'Login from blocked IP range',
            jsonb_build_object(
                'user_id', p_user_id, 
                'login_ip', p_login_ip
            )
        );
        RETURN false;
    END IF;

    -- Concurrent session management
    SELECT COUNT(*) INTO v_current_sessions
    FROM public.user_sessions
    WHERE user_id = p_user_id AND is_active = true;

    IF v_current_sessions >= v_access_record.max_concurrent_sessions THEN
        PERFORM public.log_security_risk(
            'SESSION_LIMIT', 
            'LOW', 
            'Maximum concurrent sessions exceeded',
            jsonb_build_object(
                'user_id', p_user_id, 
                'current_sessions', v_current_sessions,
                'max_sessions', v_access_record.max_concurrent_sessions
            )
        );
        RETURN false;
    END IF;

    -- Update login information
    UPDATE public.user_access_control
    SET 
        last_login_at = NOW(),
        last_login_ip = p_login_ip,
        last_login_location = p_login_location
    WHERE user_id = p_user_id;

    RETURN true;
END;
$$;


ALTER FUNCTION "public"."validate_user_access"("p_user_id" "uuid", "p_login_ip" "inet", "p_login_location" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."validate_user_signup"("p_email" "text", "p_password" "text") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $_$
DECLARE
    v_password_valid BOOLEAN;
    v_email_valid BOOLEAN;
BEGIN
    -- Password complexity check
    v_password_valid := 
        length(p_password) >= 8 AND
        p_password ~ '[A-Z]' AND  -- At least one uppercase
        p_password ~ '[a-z]' AND  -- At least one lowercase
        p_password ~ '[0-9]' AND  -- At least one number
        p_password ~ '[!@#$%^&*()]';  -- At least one special character

    -- Basic email validation
    v_email_valid := 
        p_email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$';

    -- Log signup validation attempt
    PERFORM public.log_comprehensive_audit(
        'SIGNUP_VALIDATION',
        'INFO',
        NULL,
        jsonb_build_object(
            'email_valid', v_email_valid,
            'password_valid', v_password_valid
        )
    );

    RETURN v_password_valid AND v_email_valid;
END;
$_$;


ALTER FUNCTION "public"."validate_user_signup"("p_email" "text", "p_password" "text") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."comprehensive_audit_log" (
    "id" bigint NOT NULL,
    "event_timestamp" timestamp with time zone DEFAULT "now"(),
    "event_type" "text" NOT NULL,
    "event_severity" "text",
    "user_id" "uuid",
    "actor_ip" "inet",
    "user_agent" "text",
    "service_name" "text",
    "action_category" "text",
    "resource_type" "text",
    "resource_id" "text",
    "event_details" "jsonb",
    "transaction_id" "text",
    "correlation_id" "uuid" DEFAULT "gen_random_uuid"(),
    "geo_location" "jsonb",
    "device_fingerprint" "text",
    "is_sensitive" boolean DEFAULT false,
    "retention_period" interval DEFAULT '90 days'::interval,
    CONSTRAINT "comprehensive_audit_log_event_severity_check" CHECK (("event_severity" = ANY (ARRAY['INFO'::"text", 'WARNING'::"text", 'ERROR'::"text", 'CRITICAL'::"text"])))
);


ALTER TABLE "public"."comprehensive_audit_log" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."comprehensive_audit_log_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."comprehensive_audit_log_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."comprehensive_audit_log_id_seq" OWNED BY "public"."comprehensive_audit_log"."id";



CREATE TABLE IF NOT EXISTS "public"."encryption_key_vault" (
    "id" integer NOT NULL,
    "key_name" "text" NOT NULL,
    "key_type" "text",
    "key_version" integer DEFAULT 1,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "rotated_at" timestamp with time zone,
    "metadata" "jsonb",
    CONSTRAINT "encryption_key_vault_key_type_check" CHECK (("key_type" = ANY (ARRAY['SYMMETRIC'::"text", 'ASYMMETRIC'::"text", 'TRANSIT'::"text"])))
);


ALTER TABLE "public"."encryption_key_vault" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."encryption_key_vault_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."encryption_key_vault_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."encryption_key_vault_id_seq" OWNED BY "public"."encryption_key_vault"."id";



CREATE TABLE IF NOT EXISTS "public"."marketplace_projects" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "owner_id" "uuid",
    "project_name" "text",
    "description" "text",
    "safety_rating" integer,
    CONSTRAINT "marketplace_projects_safety_rating_check" CHECK ((("safety_rating" >= 1) AND ("safety_rating" <= 10)))
);


ALTER TABLE "public"."marketplace_projects" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."membership_projects" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid",
    "project_name" "text" NOT NULL,
    "project_description" "text",
    "is_public" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "project_type" "text",
    "visibility_tier" "text",
    "status" "text" DEFAULT 'Draft'::"text",
    CONSTRAINT "membership_projects_project_type_check" CHECK (("project_type" = ANY (ARRAY['Web App'::"text", 'Mobile App'::"text", 'Machine Learning'::"text", 'Blockchain'::"text", 'Other'::"text"]))),
    CONSTRAINT "membership_projects_status_check" CHECK (("status" = ANY (ARRAY['Draft'::"text", 'In Progress'::"text", 'Completed'::"text", 'Archived'::"text"]))),
    CONSTRAINT "membership_projects_visibility_tier_check" CHECK (("visibility_tier" = ANY (ARRAY['Public'::"text", 'Members Only'::"text", 'Premium Only'::"text"])))
);


ALTER TABLE "public"."membership_projects" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."membership_tiers" (
    "tier_name" "text" NOT NULL,
    "storage_limit" integer,
    "marketplace_access" boolean DEFAULT false,
    "developer_tools_access" boolean DEFAULT false,
    "can_list_projects" boolean DEFAULT false,
    "can_rate_mvps" boolean DEFAULT false,
    "can_remove_mvps" boolean DEFAULT false,
    "can_flag_projects" boolean DEFAULT false
);


ALTER TABLE "public"."membership_tiers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."security_configuration" (
    "id" integer NOT NULL,
    "config_key" "text" NOT NULL,
    "config_value" "text",
    "description" "text",
    "last_updated" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."security_configuration" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."security_configuration_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."security_configuration_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."security_configuration_id_seq" OWNED BY "public"."security_configuration"."id";



CREATE TABLE IF NOT EXISTS "public"."security_risk_log" (
    "id" integer NOT NULL,
    "risk_type" "text" NOT NULL,
    "risk_severity" "text" NOT NULL,
    "description" "text",
    "mitigation_status" "text" DEFAULT 'OPEN'::"text",
    "detected_at" timestamp with time zone DEFAULT "now"(),
    "mitigated_at" timestamp with time zone,
    "detected_by" "text" DEFAULT CURRENT_USER,
    "notes" "jsonb",
    CONSTRAINT "security_risk_log_mitigation_status_check" CHECK (("mitigation_status" = ANY (ARRAY['OPEN'::"text", 'IN_PROGRESS'::"text", 'MITIGATED'::"text", 'REJECTED'::"text"]))),
    CONSTRAINT "security_risk_log_risk_severity_check" CHECK (("risk_severity" = ANY (ARRAY['LOW'::"text", 'MEDIUM'::"text", 'HIGH'::"text", 'CRITICAL'::"text"])))
);


ALTER TABLE "public"."security_risk_log" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."security_risk_log_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."security_risk_log_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."security_risk_log_id_seq" OWNED BY "public"."security_risk_log"."id";



CREATE TABLE IF NOT EXISTS "public"."threat_intelligence" (
    "id" integer NOT NULL,
    "threat_type" "text" NOT NULL,
    "threat_signature" "text" NOT NULL,
    "severity" "text",
    "description" "text",
    "mitigation_strategy" "jsonb",
    "first_detected_at" timestamp with time zone DEFAULT "now"(),
    "last_updated_at" timestamp with time zone DEFAULT "now"(),
    "is_active" boolean DEFAULT true,
    CONSTRAINT "threat_intelligence_severity_check" CHECK (("severity" = ANY (ARRAY['LOW'::"text", 'MEDIUM'::"text", 'HIGH'::"text", 'CRITICAL'::"text"])))
);


ALTER TABLE "public"."threat_intelligence" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."threat_intelligence_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."threat_intelligence_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."threat_intelligence_id_seq" OWNED BY "public"."threat_intelligence"."id";



CREATE TABLE IF NOT EXISTS "public"."user_access_control" (
    "user_id" "uuid" NOT NULL,
    "mfa_enabled" boolean DEFAULT false,
    "mfa_method" "text",
    "allowed_countries" "text"[] DEFAULT ARRAY[]::"text"[],
    "blocked_countries" "text"[] DEFAULT ARRAY[]::"text"[],
    "allowed_ip_ranges" "cidr"[] DEFAULT ARRAY[]::"cidr"[],
    "blocked_ip_ranges" "cidr"[] DEFAULT ARRAY[]::"cidr"[],
    "max_concurrent_sessions" integer DEFAULT 3,
    "session_timeout_minutes" integer DEFAULT 60,
    "require_password_reset" boolean DEFAULT false,
    "password_last_changed_at" timestamp with time zone,
    "last_login_at" timestamp with time zone,
    "last_login_ip" "inet",
    "last_login_location" "jsonb",
    "risk_score" integer DEFAULT 0,
    "is_compliance_hold" boolean DEFAULT false,
    "compliance_notes" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "user_access_control_mfa_method_check" CHECK (("mfa_method" = ANY (ARRAY['TOTP'::"text", 'SMS'::"text", 'EMAIL'::"text", 'HARDWARE_TOKEN'::"text"])))
);


ALTER TABLE "public"."user_access_control" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_activity_log" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid",
    "action_type" "text" NOT NULL,
    "action_details" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."user_activity_log" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_sessions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "session_token" "text" NOT NULL,
    "ip_address" "inet",
    "user_agent" "text",
    "login_time" timestamp with time zone DEFAULT "now"(),
    "last_activity" timestamp with time zone DEFAULT "now"(),
    "is_active" boolean DEFAULT true,
    "device_info" "jsonb"
);


ALTER TABLE "public"."user_sessions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" NOT NULL,
    "email" "text",
    "username" "text",
    "full_name" "text",
    "avatar_url" "text",
    "membership_tier" "text",
    "storage_limit" integer DEFAULT 10,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "last_login" timestamp with time zone,
    "email_verified" boolean DEFAULT false,
    "last_email_verification_attempt" timestamp with time zone,
    CONSTRAINT "users_membership_tier_check" CHECK (("membership_tier" = ANY (ARRAY['Administrator'::"text", 'Standard Member'::"text", 'Premium Member'::"text", 'Standard Developer'::"text", 'Premium Developer'::"text", 'Community Developer'::"text", 'Community SME'::"text"])))
);


ALTER TABLE "public"."users" OWNER TO "postgres";


ALTER TABLE ONLY "public"."comprehensive_audit_log" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."comprehensive_audit_log_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."encryption_key_vault" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."encryption_key_vault_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."security_configuration" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."security_configuration_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."security_risk_log" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."security_risk_log_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."threat_intelligence" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."threat_intelligence_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."comprehensive_audit_log"
    ADD CONSTRAINT "comprehensive_audit_log_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."encryption_key_vault"
    ADD CONSTRAINT "encryption_key_vault_key_name_key" UNIQUE ("key_name");



ALTER TABLE ONLY "public"."encryption_key_vault"
    ADD CONSTRAINT "encryption_key_vault_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."marketplace_projects"
    ADD CONSTRAINT "marketplace_projects_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."membership_projects"
    ADD CONSTRAINT "membership_projects_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."membership_tiers"
    ADD CONSTRAINT "membership_tiers_pkey" PRIMARY KEY ("tier_name");



ALTER TABLE ONLY "public"."security_configuration"
    ADD CONSTRAINT "security_configuration_config_key_key" UNIQUE ("config_key");



ALTER TABLE ONLY "public"."security_configuration"
    ADD CONSTRAINT "security_configuration_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."security_risk_log"
    ADD CONSTRAINT "security_risk_log_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."threat_intelligence"
    ADD CONSTRAINT "threat_intelligence_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."threat_intelligence"
    ADD CONSTRAINT "threat_intelligence_threat_signature_key" UNIQUE ("threat_signature");



ALTER TABLE ONLY "public"."user_access_control"
    ADD CONSTRAINT "user_access_control_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."user_activity_log"
    ADD CONSTRAINT "user_activity_log_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_sessions"
    ADD CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_username_key" UNIQUE ("username");



CREATE INDEX "idx_membership_projects_status" ON "public"."membership_projects" USING "btree" ("status");



CREATE INDEX "idx_membership_projects_user_id" ON "public"."membership_projects" USING "btree" ("user_id");



CREATE OR REPLACE TRIGGER "audit_log_retention_trigger" AFTER INSERT ON "public"."comprehensive_audit_log" FOR EACH STATEMENT EXECUTE FUNCTION "public"."manage_audit_log_retention"();



CREATE OR REPLACE TRIGGER "cleanup_sessions_trigger" AFTER INSERT ON "public"."user_sessions" FOR EACH STATEMENT EXECUTE FUNCTION "public"."cleanup_inactive_sessions"();



CREATE OR REPLACE TRIGGER "periodic_security_scan_trigger" AFTER INSERT ON "public"."security_configuration" FOR EACH ROW EXECUTE FUNCTION "public"."trigger_periodic_security_scan"();



CREATE OR REPLACE TRIGGER "threat_intelligence_update_trigger" AFTER INSERT ON "public"."security_configuration" FOR EACH ROW EXECUTE FUNCTION "public"."trigger_threat_intelligence_update"();



ALTER TABLE ONLY "public"."marketplace_projects"
    ADD CONSTRAINT "marketplace_projects_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."membership_projects"
    ADD CONSTRAINT "membership_projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."user_access_control"
    ADD CONSTRAINT "user_access_control_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_activity_log"
    ADD CONSTRAINT "user_activity_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."user_sessions"
    ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id");



CREATE POLICY "Allow authenticated users to view membership tiers" ON "public"."membership_tiers" FOR SELECT USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Allow user profile creation" ON "public"."users" FOR INSERT WITH CHECK (("auth"."uid"() = "id"));



CREATE POLICY "Community SMEs can remove unsafe MVPs" ON "public"."marketplace_projects" FOR DELETE USING ((( SELECT "membership_tiers"."can_remove_mvps"
   FROM "public"."membership_tiers"
  WHERE ("membership_tiers"."tier_name" = "public"."get_user_membership_tier"("auth"."uid"()))) = true));



CREATE POLICY "Developers can list projects" ON "public"."marketplace_projects" FOR INSERT WITH CHECK ((( SELECT "membership_tiers"."can_list_projects"
   FROM "public"."membership_tiers"
  WHERE ("membership_tiers"."tier_name" = "public"."get_user_membership_tier"("auth"."uid"()))) = true));



CREATE POLICY "Members can create projects" ON "public"."membership_projects" FOR INSERT WITH CHECK ((( SELECT "users"."membership_tier"
   FROM "public"."users"
  WHERE ("users"."id" = "auth"."uid"())) = ANY (ARRAY['Standard Member'::"text", 'Premium Member'::"text", 'Standard Developer'::"text", 'Premium Developer'::"text", 'Community Developer'::"text", 'Community SME'::"text"])));



CREATE POLICY "Only service_role can modify activity logs" ON "public"."user_activity_log" USING (("auth"."role"() = 'service_role'::"text"));



CREATE POLICY "Only service_role can modify membership tiers" ON "public"."membership_tiers" USING (("auth"."role"() = 'service_role'::"text"));



CREATE POLICY "Prevent user profile deletion" ON "public"."users" FOR DELETE USING (false);



CREATE POLICY "Project visibility" ON "public"."membership_projects" FOR SELECT USING ((("is_public" = true) OR ("user_id" = "auth"."uid"())));



CREATE POLICY "Service role can view all activity logs" ON "public"."user_activity_log" FOR SELECT USING (("auth"."role"() = 'service_role'::"text"));



CREATE POLICY "Users can delete own projects" ON "public"."membership_projects" FOR DELETE USING (("user_id" = "auth"."uid"()));



CREATE POLICY "Users can insert marketplace projects based on membership" ON "public"."marketplace_projects" FOR INSERT WITH CHECK ((( SELECT "membership_tiers"."can_list_projects"
   FROM "public"."membership_tiers"
  WHERE ("membership_tiers"."tier_name" = "public"."get_user_membership_tier"("auth"."uid"()))) = true));



CREATE POLICY "Users can insert their own activity logs" ON "public"."user_activity_log" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can insert their own membership projects" ON "public"."membership_projects" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can manage their own profile" ON "public"."users" USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can only update their own profile" ON "public"."users" FOR UPDATE USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can update own profile" ON "public"."users" FOR UPDATE USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can update own projects" ON "public"."membership_projects" FOR UPDATE USING (("user_id" = "auth"."uid"()));



CREATE POLICY "Users can view limited user info" ON "public"."users" FOR SELECT USING (true);



CREATE POLICY "Users can view marketplace projects" ON "public"."marketplace_projects" FOR SELECT USING (true);



CREATE POLICY "Users can view only their own activity logs" ON "public"."user_activity_log" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view own profile" ON "public"."users" FOR SELECT USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can view their membership projects" ON "public"."membership_projects" FOR SELECT USING (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."marketplace_projects" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."membership_projects" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."membership_tiers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_activity_log" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT ALL ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



REVOKE ALL ON FUNCTION "data_protection"."decrypt_data"("p_encrypted_data" "text", "p_key_name" "text") FROM PUBLIC;
GRANT ALL ON FUNCTION "data_protection"."decrypt_data"("p_encrypted_data" "text", "p_key_name" "text") TO "service_role";



REVOKE ALL ON FUNCTION "data_protection"."encrypt_data"("p_data" "text", "p_key_name" "text") FROM PUBLIC;
GRANT ALL ON FUNCTION "data_protection"."encrypt_data"("p_data" "text", "p_key_name" "text") TO "service_role";



REVOKE ALL ON FUNCTION "data_protection"."generate_encryption_key"("p_key_name" "text", "p_key_type" "text", "p_key_length" integer) FROM PUBLIC;
GRANT ALL ON FUNCTION "data_protection"."generate_encryption_key"("p_key_name" "text", "p_key_type" "text", "p_key_length" integer) TO "service_role";



REVOKE ALL ON FUNCTION "data_protection"."rotate_encryption_key"("p_key_name" "text") FROM PUBLIC;
GRANT ALL ON FUNCTION "data_protection"."rotate_encryption_key"("p_key_name" "text") TO "service_role";




















































































































































































REVOKE ALL ON FUNCTION "public"."check_compliance_violations"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."check_compliance_violations"() TO "service_role";



GRANT ALL ON FUNCTION "public"."check_membership_access"("required_tier" "text"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."check_membership_access"("required_tier" "text"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."check_membership_access"("required_tier" "text"[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."check_password_complexity"("password" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."cleanup_inactive_sessions"() TO "service_role";



GRANT ALL ON FUNCTION "public"."create_user_access_control"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."detect_potential_threats"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."detect_potential_threats"() TO "service_role";



GRANT ALL ON FUNCTION "public"."diagnose_auth_configuration"() TO "service_role";



GRANT ALL ON FUNCTION "public"."diagnose_signup_blockers"() TO "service_role";



GRANT ALL ON FUNCTION "public"."enforce_password_complexity"() TO "service_role";



GRANT ALL ON FUNCTION "public"."flexible_user_signup"("p_email" "text", "p_password" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."force_enable_signup"() TO "service_role";



GRANT ALL ON FUNCTION "public"."force_user_signup"("p_email" "text", "p_password" "text", "p_user_metadata" "jsonb") TO "service_role";



REVOKE ALL ON FUNCTION "public"."generate_compliance_report"("p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone) FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."generate_compliance_report"("p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone) TO "service_role";



GRANT ALL ON FUNCTION "public"."get_user_membership_tier"("user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_membership_tier"("user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_membership_tier"("user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."log_auth_config_changes"() TO "service_role";



GRANT ALL ON FUNCTION "public"."log_auth_event"("p_event_type" "text", "p_user_id" "uuid", "p_details" "jsonb") TO "service_role";



REVOKE ALL ON FUNCTION "public"."log_comprehensive_audit"("p_event_type" "text", "p_event_severity" "text", "p_user_id" "uuid", "p_event_details" "jsonb", "p_service_name" "text", "p_action_category" "text", "p_resource_type" "text", "p_resource_id" "text") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."log_comprehensive_audit"("p_event_type" "text", "p_event_severity" "text", "p_user_id" "uuid", "p_event_details" "jsonb", "p_service_name" "text", "p_action_category" "text", "p_resource_type" "text", "p_resource_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."log_security_event"("event_type" "text", "user_id" "uuid", "event_details" "jsonb") TO "service_role";



REVOKE ALL ON FUNCTION "public"."log_security_risk"("p_risk_type" "text", "p_risk_severity" "text", "p_description" "text", "p_notes" "jsonb") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."log_security_risk"("p_risk_type" "text", "p_risk_severity" "text", "p_description" "text", "p_notes" "jsonb") TO "service_role";



GRANT ALL ON FUNCTION "public"."log_user_activity"("p_user_id" "uuid", "p_action_type" "text", "p_action_details" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."log_user_activity"("p_user_id" "uuid", "p_action_type" "text", "p_action_details" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."log_user_activity"("p_user_id" "uuid", "p_action_type" "text", "p_action_details" "jsonb") TO "service_role";



GRANT ALL ON FUNCTION "public"."manage_audit_log_retention"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."manage_security_policy"("p_table_name" "text", "p_policy_type" "text", "p_policy_definition" "jsonb") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."manage_security_policy"("p_table_name" "text", "p_policy_type" "text", "p_policy_definition" "jsonb") TO "service_role";



REVOKE ALL ON FUNCTION "public"."manage_user_access_control"("p_user_id" "uuid", "p_action" "text", "p_params" "jsonb") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."manage_user_access_control"("p_user_id" "uuid", "p_action" "text", "p_params" "jsonb") TO "service_role";



REVOKE ALL ON FUNCTION "public"."manage_user_session"("p_user_id" "uuid", "p_action" "text", "p_session_token" "text", "p_device_info" "jsonb") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."manage_user_session"("p_user_id" "uuid", "p_action" "text", "p_session_token" "text", "p_device_info" "jsonb") TO "service_role";



REVOKE ALL ON FUNCTION "public"."mitigate_threat"("p_threat_id" "uuid", "p_threat_type" "text", "p_user_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."mitigate_threat"("p_threat_id" "uuid", "p_threat_type" "text", "p_user_id" "uuid") TO "service_role";



REVOKE ALL ON FUNCTION "public"."perform_security_scan"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."perform_security_scan"() TO "service_role";



GRANT ALL ON FUNCTION "public"."reset_auth_configuration"() TO "service_role";



GRANT ALL ON FUNCTION "public"."reset_auth_environment"() TO "service_role";



GRANT ALL ON FUNCTION "public"."simplified_user_signup"("p_email" "text", "p_password" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."trigger_periodic_security_scan"() TO "service_role";



GRANT ALL ON FUNCTION "public"."trigger_threat_intelligence_update"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_email_verification"("p_user_id" "uuid", "p_verification_status" boolean) TO "service_role";



REVOKE ALL ON FUNCTION "public"."update_threat_intelligence"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."update_threat_intelligence"() TO "service_role";



GRANT ALL ON FUNCTION "public"."upgrade_membership_tier"("p_new_tier" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."upgrade_membership_tier"("user_id" "uuid", "new_tier" "text") TO "service_role";



REVOKE ALL ON FUNCTION "public"."validate_user_access"("p_user_id" "uuid", "p_login_ip" "inet", "p_login_location" "jsonb") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."validate_user_access"("p_user_id" "uuid", "p_login_ip" "inet", "p_login_location" "jsonb") TO "service_role";



GRANT ALL ON FUNCTION "public"."validate_user_signup"("p_email" "text", "p_password" "text") TO "service_role";


















GRANT ALL ON TABLE "public"."comprehensive_audit_log" TO "service_role";



GRANT ALL ON SEQUENCE "public"."comprehensive_audit_log_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."encryption_key_vault" TO "service_role";



GRANT ALL ON SEQUENCE "public"."encryption_key_vault_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."marketplace_projects" TO "anon";
GRANT ALL ON TABLE "public"."marketplace_projects" TO "authenticated";
GRANT ALL ON TABLE "public"."marketplace_projects" TO "service_role";



GRANT ALL ON TABLE "public"."membership_projects" TO "service_role";



GRANT ALL ON TABLE "public"."membership_tiers" TO "service_role";



GRANT ALL ON TABLE "public"."security_configuration" TO "service_role";



GRANT ALL ON SEQUENCE "public"."security_configuration_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."security_risk_log" TO "service_role";



GRANT ALL ON SEQUENCE "public"."security_risk_log_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."threat_intelligence" TO "service_role";



GRANT ALL ON SEQUENCE "public"."threat_intelligence_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."user_access_control" TO "service_role";



GRANT ALL ON TABLE "public"."user_activity_log" TO "service_role";



GRANT ALL ON TABLE "public"."user_sessions" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
