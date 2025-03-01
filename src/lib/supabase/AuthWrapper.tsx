import React from 'react'
import { useAuth } from './auth'
import LoginPage from '../../pages/LoginPage'

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, error } = useAuth()

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    console.error('Authentication Error:', error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50 p-4">
        <div className="text-center">
          <h2 className="text-2xl text-red-600 mb-4">Authentication Error</h2>
          <p className="text-red-500 mb-2">{error.message}</p>
          <p className="text-sm text-gray-600">
            Please try logging in again or contact support if the issue persists.
          </p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  return <>{children}</>
}

export default AuthWrapper