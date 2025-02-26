import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import DevelopersPage from './pages/DevelopersPage';
import AboutPage from './pages/AboutPage';
import DeveloperProfilePage from './pages/DeveloperProfilePage';
import AgentDetailPage from './pages/AgentDetailPage';
import UseCasePage from './pages/UseCasePage';
import AuthWrapper from './components/auth/AuthWrapper';
import FloatingToolbar from './components/FloatingToolbar';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthWrapper>
          <div className="min-h-screen bg-black flex flex-col">
            <ThemeToggle />
            <Navbar />
            <main className="flex-grow">
              <FloatingToolbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/developers" element={<DevelopersPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/developer/:id" element={<DeveloperProfilePage />} />
                <Route path="/agent/:id" element={<AgentDetailPage />} />
                <Route path="/usecase" element={<UseCasePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthWrapper>
      </Router>
    </ThemeProvider>
  );
}

export default App;