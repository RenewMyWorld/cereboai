import React, { useState, useEffect } from 'react'
import { signUp, checkUsernameAvailability } from '@/lib/supabase/auth'
import { useNavigate } from 'react-router-dom'

const Signup: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
  const navigate = useNavigate()

  // Debounce username availability check
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    const checkUsername = async () => {
      if (username.length > 2) {
        try {
          const isAvailable = await checkUsernameAvailability(username)
          setUsernameAvailable(isAvailable)
        } catch {
          setUsernameAvailable(null)
        }
      }
    }

    if (username) {
      timeoutId = setTimeout(checkUsername, 500)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [username])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // Validation checks
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setIsLoading(false)
      return
    }

    if (!username) {
      setError('Please choose a username')
      setIsLoading(false)
      return
    }

    if (usernameAvailable !== true) {
      setError('Username is not available')
      setIsLoading(false)
      return
    }

    try {
      const result = await signUp(email, password)
      
      if (result?.user) {
        // Successful signup
        navigate('/welcome') // Redirect to welcome page
      } else {
        setError('Signup failed. Please try again.')
      }
    } catch (err) {
      // More detailed error handling
      if (err instanceof Error) {
        switch (err.message) {
          case 'User already exists':
            setError('An account with this email already exists.')
            break
          case 'Username is already taken':
            setError('This username is already taken. Please choose another.')
            break
          case 'Invalid login credentials':
            setError('Invalid email or password.')
            break
          case 'Database error saving user':
            setError('There was a problem creating your account. Please try again later.')
            break
          default:
            setError(err.message || 'An unexpected error occurred')
        }
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your Cerebo account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              sign in to an existing account
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  usernameAvailable === false 
                    ? 'border-red-500 text-red-900' 
                    : usernameAvailable === true 
                    ? 'border-green-500 text-green-900' 
                    : 'border-gray-300 text-gray-900'
                } placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
              />
              {usernameAvailable === false && (
                <p className="text-red-500 text-xs mt-1">Username is already taken</p>
              )}
              {usernameAvailable === true && (
                <p className="text-green-500 text-xs mt-1">Username is available</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading || usernameAvailable !== true}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
