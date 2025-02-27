import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`fixed top-6 right-6 p-2.5 rounded-full transition-all duration-300 z-50
        ${isDark
          ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-lg shadow-lg'
          : 'bg-slate-800/40 hover:bg-slate-800/60 text-white shadow-md border-0 backdrop-blur-lg'
        }`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-300" strokeWidth={2} />
      ) : (
        <Moon className="w-5 h-5 text-blue-600" strokeWidth={2} />
      )}
    </button>
  );
}

export default ThemeToggle;
