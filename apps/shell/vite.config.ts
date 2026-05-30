import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { defineConfig } from 'vite';

const appRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: appRoot,
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        focus: process.env.VITE_FOCUS_REMOTE ?? 'http://localhost:4201/assets/remoteEntry.js',
        insights: process.env.VITE_INSIGHTS_REMOTE ?? 'http://localhost:4202/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: { port: 3000 },
  preview: { port: 4300 },
  build: {
    outDir: '../../dist/apps/shell',
    emptyOutDir: true,
    target: 'esnext',
    modulePreload: false,
    cssCodeSplit: false,
  },
});
