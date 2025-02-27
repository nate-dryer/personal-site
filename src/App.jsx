import React, { lazy, Suspense } from 'react';
import ProfileCard from './components/ProfileCard';
import ThemeToggle from './components/ThemeToggle';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components not needed for initial render
const BackgroundAnimation = lazy(() => import('./components/BackgroundAnimation'));

function App() {
  return (
    <ErrorBoundary>
      <div className="relative min-h-screen">
        {/* Only load BackgroundAnimation on desktop */}
        <div className="hidden md:block">
          <Suspense fallback={<div className="fixed inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />}>
            {typeof window !== 'undefined' && window.innerWidth >= 768 && <BackgroundAnimation />}
          </Suspense>
        </div>
        <ProfileCard />
        <ThemeToggle />
      </div>
    </ErrorBoundary>
  );
}

export default App;