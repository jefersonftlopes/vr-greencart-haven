import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'footer',
      filename: 'remoteEntry.js',
      exposes: { './Footer': './src/Footer.tsx' },
      shared: {
        react: { singleton: true, requiredVersion: '^19.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
      },
    }),
  ],
  server: { port: 3002, strictPort: true, cors: true },
  preview: { port: 3002, strictPort: true, cors: true },
  build: { target: 'esnext', modulePreload: false, cssCodeSplit: false },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
