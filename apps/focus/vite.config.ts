import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const appRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: appRoot,
  plugins: [
    react(),
    federation({
      name: 'focus',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './apps/focus/src/RemoteApp.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: { port: 4201 },
  preview: { port: 4301 },
  build: {
    outDir: '../../dist/apps/focus',
    emptyOutDir: true,
    target: 'esnext',
    modulePreload: false,
    cssCodeSplit: false,
  },
});
