import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Fullstack_ProjectEMS/', // Make sure this matches your repo name
  build: {
    outDir: 'dist',
  },
});
