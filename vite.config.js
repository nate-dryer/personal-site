import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

// Import React plugin using dynamic import
const react = await import('@vitejs/plugin-react');

export default defineConfig({
  plugins: [react.default()],
  base: './', // Relative paths for GitHub Pages
  resolve: {
    alias: {
      '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src')
    }
  },
  server: {
    port: 3000,
    host: 'localhost',
    open: true,
    strictPort: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    target: 'es2018', // Better browser compatibility
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react', 
            'react-dom'
          ],
          background: ['./src/components/BackgroundAnimation.jsx']
        }
      }
    },
    cssCodeSplit: true,
    reportCompressedSize: false, // Faster builds
    chunkSizeWarningLimit: 1000 // Increase warning limit to avoid excessive warnings
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
});