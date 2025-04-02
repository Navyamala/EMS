import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Detect if deploying to GitHub Pages
const isGitHubPages = process.env.NODE_ENV === 'production' && process.env.GITHUB_ACTIONS;

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? '/Fullstack_ProjectEMS/' : '/', // Set correct base path for GitHub Pages
  build: {
    outDir: 'dist', // Output directory (Vercel will use this)
  },
  server: {
    port: 3000,
  },
});
