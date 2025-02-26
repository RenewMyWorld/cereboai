import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Send, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const Newsletter = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const getThemeStyles = () => {
    switch (theme) {
      case 'light':
        return {
          background: 'bg-white',
          text: 'text-gray-900',
          subtext: 'text-gray-600',
          card: 'bg-white',
          input: 'bg-gray-50 border-gray-300 focus:border-blue-500 text-gray-900',
          button: 'bg-blue-500 hover:bg-blue-600 text-white',
          border: 'border-gray-200',
          shadow: 'shadow-lg',
          success: 'text-green-600 bg-green-50',
          error: 'text-red-600 bg-red-50'
        };
      case 'dark':
        return {
          background: 'bg-gray-900',
          text: 'text-white',
          subtext: 'text-gray-300',
          card: 'bg-gray-800',
          input: 'bg-gray-700 border-gray-600 focus:border-blue-400 text-white',
          button: 'bg-blue-600 hover:bg-blue-700 text-white',
          border: 'border-gray-700',
          shadow: 'shadow-xl',
          success: 'text-green-400 bg-green-900/30',
          error: 'text-red-400 bg-red-900/30'
        };
      default:
        return {
          background: 'bg-black/30 backdrop-blur-md',
          text: 'text-white',
          subtext: 'text-gray-300',
          card: 'bg-white/10',
          input: 'bg-white/10 border-white/20 focus:border-blue-400 text-white',
          button: 'bg-blue-500 hover:bg-blue-600 text-white',
          border: 'border-white/20',
          shadow: 'shadow-xl',
          success: 'text-green-400 bg-green-500/10',
          error: 'text-red-400 bg-red-500/10'
        };
    }
  };

  const styles = getThemeStyles();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success simulation
      setStatus('success');
      setMessage('Thank you for subscribing to our newsletter!');
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }
  };

  return (
    <div className={`w-full py-12 ${styles.background}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`
          rounded-2xl ${styles.card} ${styles.border} ${styles.shadow}
          p-8 md:p-12 text-center
        `}>
          <h2 className={`text-3xl font-bold mb-4 ${styles.text}`}>
            Stay Updated with Cerebo
          </h2>
          <p className={`text-lg mb-8 ${styles.subtext}`}>
            Subscribe to our newsletter for the latest updates on AI development tools and features
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`
                  flex-1 px-4 py-3 rounded-lg border ${styles.input}
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50
                  transition-colors
                `}
                disabled={status === 'loading'}
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`
                  px-6 py-3 rounded-lg ${styles.button}
                  font-semibold flex items-center justify-center
                  transition-all duration-200 disabled:opacity-70
                  min-w-[120px]
                `}
              >
                {status === 'loading' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Subscribe
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>

            {/* Status Message */}
            {message && (
              <div className={`
                mt-4 p-3 rounded-lg flex items-center justify-center gap-2
                ${status === 'success' ? styles.success : styles.error}
              `}>
                {status === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                {message}
              </div>
            )}
          </form>

          <p className={`mt-6 text-sm ${styles.subtext}`}>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;