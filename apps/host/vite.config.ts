import { defineConfig } from "vite";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "host",
      remotes: {
        header: {
          type: "module",
          name: "header",
          entry: "http://localhost:3001/remoteEntry.js",
        },
        footer: {
          type: "module",
          name: "footer",
          entry: "http://localhost:3002/remoteEntry.js",
        },
        cards: {
          type: "module",
          name: "cards",
          entry: "http://localhost:3003/remoteEntry.js",
        },
        checkout: {
          type: "module",
          name: "checkout",
          entry: "http://localhost:3004/remoteEntry.js",
        },
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
        "react-redux": { singleton: true, requiredVersion: "^9.0.0" },
        "@reduxjs/toolkit": { singleton: true, requiredVersion: "^2.0.0" },
        "react-router-dom": { singleton: true, requiredVersion: "^7.0.0" },
        "@greencart/store": { singleton: true, requiredVersion: "*" },
      },
    }),
  ],
  server: { port: 3000, strictPort: true },
  preview: { port: 3000, strictPort: true },
  build: { target: "esnext", modulePreload: false, cssCodeSplit: false },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    // Aliases para stubar os módulos federados em testes (não há MF em test)
    alias: {
      "header/Header": resolve(__dirname, "src/test/stubs/header.tsx"),
      "footer/Footer": resolve(__dirname, "src/test/stubs/footer.tsx"),
      "cards/ProductList": resolve(__dirname, "src/test/stubs/cards.tsx"),
      "checkout/CheckoutPage": resolve(__dirname, "src/test/stubs/checkout.tsx"),
      "checkout/OrderSuccessPage": resolve(__dirname, "src/test/stubs/checkout.tsx"),
    },
  },
});
