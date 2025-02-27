import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Supabase client for testing
vi.mock('@/lib/supabase/auth', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      getUser: vi.fn(),
      getSession: vi.fn(),
    }
  },
  signUp: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
}))

// Add any global test setup here
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), 
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
})
