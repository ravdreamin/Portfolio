import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'lenis/dist/lenis.css';
import Lenis from 'lenis';

// Pages
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { CaseStudy } from './pages/CaseStudy';
import { Blog } from './pages/Blog';
import { Gallery } from './pages/Gallery';

// Layout
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Hooks
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    document.title = "Gaurav — Full Stack Engineer";
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    link.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23171717%22 rx=%2220%22/><text x=%2250%22 y=%2250%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22system-ui%22 font-weight=%22600%22 font-size=%2250%22>G</text></svg>`;
    document.head.appendChild(link);

    if (!document.getElementById('cormorant-font')) {
      const fontLink = document.createElement('link');
      fontLink.id = 'cormorant-font';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,600&display=swap';
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);
    }

    if (!document.getElementById('greatvibes-font')) {
      const gvLink = document.createElement('link');
      gvLink.id = 'greatvibes-font';
      gvLink.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap';
      gvLink.rel = 'stylesheet';
      document.head.appendChild(gvLink);
    }
  }, []);

  useEffect(() => {
    // Lenis creates the smooth scrolling effect
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    // Scroll to top when changing routes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen bg-transparent dark:bg-black text-neutral-900 dark:text-neutral-50 transition-colors duration-300">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}
