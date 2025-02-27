import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const getInitialTheme = () => {
  try {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  } catch (error) {
    console.warn('Failed to access localStorage:', error);
    return false;
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    root.classList.toggle('light', !isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      try {
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      } catch (error) {
        console.warn('Failed to save theme:', error);
      }
      return newTheme;
    });
  };

  const contextValue = useMemo(() => ({
    isDark,
    toggleTheme
  }), [isDark]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ThemeContext;