import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

const PROJECT_BASENAME = 'react-mui-actions';

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${PROJECT_BASENAME}/`,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __PROJECT_BASENAME__: JSON.stringify(PROJECT_BASENAME),
  },
  server: {
    port: 4000,
  },
  preview: {
    port: 4000,
    host: true,
  },
});
