alter table "auth"."users" drop constraint "users_phone_key";

drop index if exists "auth"."users_phone_key";

alter table "auth"."users" add column "is_locked" boolean default false;

alter table "auth"."users" add column "last_login_attempt" timestamp with time zone;

alter table "auth"."users" add column "lock_until" timestamp with time zone;

alter table "auth"."users" add column "login_attempts" integer default 0;

alter table "auth"."users" add column "signup_enabled" boolean default true;

alter table "auth"."users" disable row level security;

CREATE TRIGGER encrypt_sensitive_user_data BEFORE INSERT OR UPDATE ON auth.users FOR EACH ROW EXECUTE FUNCTION data_protection.auto_encrypt_sensitive_columns();

CREATE TRIGGER enforce_password_complexity_trigger BEFORE INSERT OR UPDATE ON auth.users FOR EACH ROW EXECUTE FUNCTION enforce_password_complexity();

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

CREATE TRIGGER user_access_control_trigger AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION create_user_access_control();


