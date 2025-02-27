import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

// Import React plugin using dynamic import
const react = await import('@vitejs/plugin-react');

export default defineConfig({
  plugins: [react.default()],
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
  }
});