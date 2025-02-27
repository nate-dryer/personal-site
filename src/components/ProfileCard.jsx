import React, { useEffect, useState } from 'react';
import { Spinner } from './Spinner';
import { useTheme } from '../contexts/ThemeContext';
import profileImage from '../assets/images/profile.png'; 
// Add fallback path to public directory for better path stability
const profilePublicPath = '/assets/profile.png';

function ProfileCard() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { isDark } = useTheme();

  useEffect(() => {
    setIsMounted(true);
    // Reduced artificial loading delay for better performance
    const timer = setTimeout(() => setIsLoading(false), 300);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Debounce the resize event for better performance
    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', debouncedResize, { passive: true });
    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  useEffect(() => {
    // Track mouse movement to update CSS variables for the hover effect
    // Optimized with debouncing and passive event listener
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth) * 100;
          const y = (e.clientY / window.innerHeight) * 100;
          document.documentElement.style.setProperty('--cursor-x', `${x}%`);
          document.documentElement.style.setProperty('--cursor-y', `${y}%`);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  const handleImageError = (e) => {
    setImageError(true);
    e.target.style.display = 'none';
    // Using the gradient placeholder
    e.target.parentElement.classList.add('gradient-placeholder');
  };

  return (
    <div className="relative flex items-center justify-center w-screen h-screen overflow-hidden pointer-events-none">
      {/* Inner card container with translucent blue background to show particles behind without affecting readability */}
      <div className={`glass-effect relative w-full md:w-[90%] md:max-w-xl flex flex-col items-center gap-6 md:gap-8 transition-all duration-500
                    md:rounded-[28px] rounded-xl
                    shadow-lg md:shadow-xl
                    pointer-events-auto
                    ${isMobile ? 'bg-opacity-95 border-0' : 'md:border border-0'} 
                    ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {/* Content wrapper to keep content above background overlay */}
        <div className="relative z-10 w-full flex flex-col items-center gap-8">
          <div className={`photo-container w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden relative p-0
                            ${imageError ? 'gradient-placeholder flex items-center justify-center' : ''}`}
          >
            {imageError ? (
              <span className="text-5xl font-outfit font-bold gradient-text interactive-text">ND</span>
            ) : (
              <img
                src={profileImage}
                alt="Nate Dryer - Product Manager and AI & ML Innovator"
                className="w-full object-cover transition-transform duration-300 hover:scale-105"
                style={{ objectPosition: "center 7px", transform: "scale(0.91)" }}
                onError={(e) => {
                  // Try the public path as fallback before showing placeholder
                  e.target.src = profilePublicPath;
                  e.target.onerror = handleImageError;
                }}
                loading="eager"
                width="160"
                height="160"
                fetchpriority="high"
              />
            )}
          </div>
          
          <div className="text-center mb-8">
            <h1 className="gradient-header font-outfit font-medium text-5xl sm:text-6xl md:text-7xl tracking-wide leading-none normal-case
                          hover:scale-105 transition-all duration-300 cursor-pointer mb-4">
              Nate Dryer
            </h1>
            <p className="font-outfit font-medium text-lg sm:text-xl md:text-2xl tracking-wide
                          max-w-md mx-auto transition-colors duration-300 interactive-text
                          gradient-text">
              Product Manager | AI & ML Innovator
            </p>
          </div>
          <div className="flex flex-col w-full max-w-sm gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              <a
                href="mailto:email@natedryer.com"
                aria-label="Get in Touch"
                className="gradient-button secondary group inline-flex items-center justify-center gap-4 transition-all duration-200"
              >
                <span className="flex items-center justify-center w-7 h-7">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gradient-icon-secondary">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <span className="text-lg font-outfit font-medium gradient-text-secondary tracking-wide">Contact</span>
              </a>
              
              <a
                href="/resume.pdf"
                download="Nate_Dryer_Resume.pdf"
                aria-label="Download Resume"
                className="gradient-button secondary group inline-flex items-center justify-center gap-4 transition-all duration-200"
                onClick={(e) => {
                  // If the file doesn't exist, prevent default behavior and show a message
                  const handleClick = () => {
                    alert("Resume will be available for download soon.");
                  };
                  handleClick();
                }}
              >
                <span className="flex items-center justify-center w-7 h-7">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gradient-icon-secondary">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <line x1="10" y1="9" x2="8" y2="9" />
                  </svg>
                </span>
                <span className="text-lg font-outfit font-medium gradient-text-secondary tracking-wide">Resume</span>
              </a>

              <a
                href="https://www.linkedin.com/in/natedryer/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="gradient-button secondary group inline-flex items-center justify-center gap-4 transition-all duration-200"
              >
                <span className="flex items-center justify-center w-7 h-7">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gradient-icon-secondary">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </span>
                <span className="text-lg font-outfit font-medium gradient-text-secondary tracking-wide">LinkedIn</span>
              </a>
              <a
                href="https://github.com/nate-dryer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="gradient-button secondary group inline-flex items-center justify-center gap-4 transition-all duration-200"
              >
                <span className="flex items-center justify-center w-7 h-7">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gradient-icon-secondary">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </span>
                <span className="text-lg font-outfit font-medium gradient-text-secondary tracking-wide">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright label - Fixed position at the bottom of the viewport */}
      <div className="fixed bottom-6 left-0 w-full text-center z-30 pointer-events-auto">
        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium bg-white/5 dark:bg-black/5 backdrop-blur-md py-1.5 px-4 rounded-full mx-auto inline-block shadow-sm border border-slate-200/10 dark:border-slate-200/5">
          © {new Date().getFullYear()} Nate Dryer. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default ProfileCard;