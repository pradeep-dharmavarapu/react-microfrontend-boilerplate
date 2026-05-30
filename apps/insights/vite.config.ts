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
      name: 'insights',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './apps/insights/src/RemoteApp.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: { port: 4202 },
  preview: { port: 4302 },
  build: {
    outDir: '../../dist/apps/insights',
    emptyOutDir: true,
    target: 'esnext',
    modulePreload: false,
    cssCodeSplit: false,
  },
});
