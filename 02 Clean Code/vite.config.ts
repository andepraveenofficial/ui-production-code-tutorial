import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // Automatically opens the visualizer in your default browser
      filename: 'stats.html', // Output file name
      template: 'treemap', // Options: 'sunburst', 'treemap', etc.
      brotliSize: true, // Show the size of the bundle using Brotli compression
    }),
  ],
});
