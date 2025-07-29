import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import SolutionsPage from './pages/SolutionsPage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import BlogPage from './pages/BlogPage';
import PartnershipsPage from './pages/PartnershipsPage';

const AppContent = () => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  // Check if we're on the dashboard route to hide navbar and footer
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  
  return (
    <>
      {!isDashboardRoute && <Navbar />}
      <div className={isDashboardRoute ? '' : 'min-h-screen'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard/*" element={<DashboardPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/partnerships" element={<PartnershipsPage />} />
        </Routes>
      </div>
      {!isDashboardRoute && <Footer />}
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;