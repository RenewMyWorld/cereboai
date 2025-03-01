import React from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase/auth'

const WelcomePage: React.FC = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = React.useState('')

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) throw error

        if (user) {
          setUserName(user.email?.split('@')[0] || 'Developer')
        } else {
          // Redirect to login if no user
          navigate('/login')
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        navigate('/login')
      }
    }
    fetchUserData()
  }, [navigate])

  const handleExploreMarketplace = () => {
    navigate('/marketplace')
  }

  const handleCompleteProfile = () => {
    navigate('/profile/setup')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Cerebo, {userName}!
          </h2>
          <p className="text-gray-600 mb-6">
            You're now part of a community of innovative developers and creators.
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleExploreMarketplace}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a1 1 0 00.894 1.789c.942-.475 1.828-.279 2.394.692.479.87.687 2.059.687 3.285 0 .56.448 1 1 1h6c.552 0 1-.44 1-1 0-1.226.208-2.415.687-3.285.566-.971 1.452-1.167 2.394-.692a1 1 0 00.894-1.789A9.956 9.956 0 0116 8a6 6 0 00-6-6z" clipRule="evenodd" />
            </svg>
            <span>Explore Marketplace</span>
          </button>

          <button 
            onClick={handleCompleteProfile}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300 flex items-center justify-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span>Complete Your Profile</span>
          </button>
        </div>

        <div className="text-center text-sm text-gray-500">
          Need help getting started? 
          <a href="/help" className="ml-1 text-blue-600 hover:underline">
            Check our guide
          </a>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage