import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Leaf } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Nos Solutions', path: '/solutions' },
    { label: 'Partenariats', path: '/partnerships' },
    { label: 'Blog', path: '/blog' },
    { label: 'Galerie', path: '/gallery' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || isOpen 
          ? 'bg-white shadow-md dark:bg-gray-900' 
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center gap-2 text-green-600 dark:text-green-400"
            onClick={closeMenu}
          >
            <Leaf className="h-8 w-8" />
            <span className="text-xl font-bold">MAITSO</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    location.pathname === item.path
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="rounded-full p-1.5 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard">
                    <Button variant="secondary" size="sm">Dashboard</Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={logout}>Se déconnecter</Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Se connecter</Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="primary" size="sm">S'inscrire</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleTheme}
              className="rounded-full p-1.5 mr-3 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-screen' : 'max-h-0'
        )}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col space-y-3 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'py-2 text-base font-medium transition-colors',
                  location.pathname === item.path
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400'
                )}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="py-2 text-green-600 font-medium dark:text-green-400"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="py-2 text-left text-gray-700 font-medium dark:text-gray-300"
                >
                  Se déconnecter
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="py-2 text-gray-700 font-medium dark:text-gray-300"
                  onClick={closeMenu}
                >
                  Se connecter
                </Link>
                <Link 
                  to="/signup" 
                  className="py-2 text-green-600 font-medium dark:text-green-400"
                  onClick={closeMenu}
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;