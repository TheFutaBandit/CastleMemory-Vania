import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: true,
      // Include these additional options
      svgrOptions: {
        icon: true,
        svgo: true,
        // ... other options if needed
      }
    })
  ]
});