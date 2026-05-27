import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'cards',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductList': './src/ProductList.tsx',
        './ProductCard': './src/ProductCard.tsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^19.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
        'react-redux': { singleton: true, requiredVersion: '^9.0.0' },
        '@reduxjs/toolkit': { singleton: true, requiredVersion: '^2.0.0' },
        'react-router-dom': { singleton: true, requiredVersion: '^7.0.0' },
        '@greencart/store': { singleton: true, requiredVersion: '*' },
      },
    }),
  ],
  server: { port: 3003, strictPort: true, cors: true },
  preview: { port: 3003, strictPort: true, cors: true },
  build: { target: 'esnext', modulePreload: false, cssCodeSplit: false },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
