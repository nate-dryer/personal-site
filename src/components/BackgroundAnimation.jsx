import React, { useEffect, useRef, useMemo, useCallback, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();
  const particles = useRef([]);
  const mousePosition = useRef({ x: null, y: null });
  const workerRef = useRef(null);
  const rafRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ x: '50%', y: '50%' });

  const colors = useMemo(() => ({
    dark: {
      primary: 'rgba(59, 130, 246, 0.5)',
      secondary: 'rgba(99, 102, 241, 0.5)',
      accent: 'rgba(139, 92, 246, 0.5)'
    },
    light: {
      // Medium-toned indigo-purple particles for enhanced visibility
      primary: 'rgba(79, 70, 229, 0.75)',  // Richer indigo
      secondary: 'rgba(99, 102, 241, 0.75)', // Medium indigo
      accent: 'rgba(124, 58, 237, 0.75)'     // Medium-toned purple
    }
  }), []);

  const createParticles = useCallback((width, height) => {
    // Optimize particle count based on device capabilities
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const isLowPowerDevice = hardwareConcurrency <= 4;
    // Reduce particle count on low-power devices
    const particleCount = isLowPowerDevice
      ? Math.min(80, Math.floor((width * height) / 30000))
      : Math.min(150, Math.floor((width * height) / 20000));
      
    return Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      colorType: Math.random() > 0.7 ? 'accent' : Math.random() > 0.5 ? 'secondary' : 'primary'
    }));
  }, []);

  const drawParticles = useCallback((ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    particles.current.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      const currentColors = isDark ? colors.dark : colors.light;
      ctx.fillStyle = currentColors[particle.colorType];
      ctx.fill();
    });
  }, [isDark, colors]);

  // Update CSS variables for cursor-aware gradient
  useEffect(() => {
    // Use requestAnimationFrame for smoother cursor tracking
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Calculate cursor position as percentages for CSS variables
          const x = `${(e.clientX / window.innerWidth) * 100}%`;
          const y = `${(e.clientY / window.innerHeight) * 100}%`;
          
          setCursorPosition({ x, y });
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const worker = new Worker(new URL('../workers/particle.worker.js', import.meta.url));
    workerRef.current = worker;

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles.current = createParticles(canvas.width, canvas.height);
      }, 100);
    };

    // Initial resize needs to happen immediately (not debounced)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles.current = createParticles(canvas.width, canvas.height);

    // Use a less frequent animation frame on low-end devices
    const isLowPowerDevice = (navigator.hardwareConcurrency || 4) <= 4;
    const frameSkip = isLowPowerDevice ? 2 : 1;
    let frameCount = 0;

    const animate = () => {
      frameCount++;
      if (frameCount % frameSkip === 0) {
        worker.postMessage({
          particles: particles.current,
          mousePosition: mousePosition.current, 
          canvasWidth: canvas.width,
          canvasHeight: canvas.height
        });
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    worker.onmessage = (e) => {
      particles.current = e.data;
      drawParticles(ctx);
    };

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    });

    canvas.addEventListener('mouseleave', () => {
      mousePosition.current = { x: null, y: null };
    });

    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      particles.current.forEach(particle => {
        const dx = x - particle.x;
        const dy = y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (1 - distance / 150) * 5;
          const angle = Math.atan2(dy, dx);
          particle.vx = -Math.cos(angle) * force;
          particle.vy = -Math.sin(angle) * force;
        }
      });
    });

    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      worker.terminate();
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [isDark, colors, createParticles, drawParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full particle-canvas"
      style={{ touchAction: 'none' }}
      aria-hidden="true"
    />
  );
};

export default BackgroundAnimation;