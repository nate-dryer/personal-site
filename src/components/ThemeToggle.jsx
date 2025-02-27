import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`fixed top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 z-50
        ${isDark
          ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-lg shadow-lg'
          : 'bg-indigo-200/80 hover:bg-indigo-300/80 text-indigo-800 shadow-md border border-indigo-300/60 backdrop-blur-lg'
        }`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-300" strokeWidth={2} />
      ) : (
        <Moon className="w-5 h-5 text-purple-700" strokeWidth={2} />
      )}
    </button>
  );
}

export default ThemeToggle;
