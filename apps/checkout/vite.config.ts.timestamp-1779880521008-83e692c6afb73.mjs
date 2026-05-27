// vite.config.ts
import { defineConfig } from "file:///Users/jefersonlopes/Documents/Projetos/vr-greencart-haven/node_modules/.pnpm/vite@5.4.21_@types+node@25.9.1_lightningcss@1.32.0/node_modules/vite/dist/node/index.js";
import react from "file:///Users/jefersonlopes/Documents/Projetos/vr-greencart-haven/node_modules/.pnpm/@vitejs+plugin-react@4.7.0_vite@5.4.21_@types+node@25.9.1_lightningcss@1.32.0_/node_modules/@vitejs/plugin-react/dist/index.js";
import tailwindcss from "file:///Users/jefersonlopes/Documents/Projetos/vr-greencart-haven/node_modules/.pnpm/@tailwindcss+vite@4.3.0_vite@5.4.21_@types+node@25.9.1_lightningcss@1.32.0_/node_modules/@tailwindcss/vite/dist/index.mjs";
import { federation } from "file:///Users/jefersonlopes/Documents/Projetos/vr-greencart-haven/node_modules/.pnpm/@module-federation+vite@1.15.5_typescript@5.9.3_vite@5.4.21_@types+node@25.9.1_lightningcss@1.32.0_/node_modules/@module-federation/vite/lib/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "checkout",
      filename: "remoteEntry.js",
      exposes: { "./CheckoutPage": "./src/CheckoutPage.tsx" },
      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
        "react-redux": { singleton: true, requiredVersion: "^9.0.0" },
        "@reduxjs/toolkit": { singleton: true, requiredVersion: "^2.0.0" },
        "@greencart/store": { singleton: true, requiredVersion: "*" }
      }
    })
  ],
  server: { port: 3004, strictPort: true, cors: true },
  preview: { port: 3004, strictPort: true, cors: true },
  build: { target: "esnext", modulePreload: false, cssCodeSplit: false },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvamVmZXJzb25sb3Blcy9Eb2N1bWVudHMvUHJvamV0b3MvdnItZ3JlZW5jYXJ0LWhhdmVuL2FwcHMvY2hlY2tvdXRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qZWZlcnNvbmxvcGVzL0RvY3VtZW50cy9Qcm9qZXRvcy92ci1ncmVlbmNhcnQtaGF2ZW4vYXBwcy9jaGVja291dC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvamVmZXJzb25sb3Blcy9Eb2N1bWVudHMvUHJvamV0b3MvdnItZ3JlZW5jYXJ0LWhhdmVuL2FwcHMvY2hlY2tvdXQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gXCJAdGFpbHdpbmRjc3Mvdml0ZVwiO1xuaW1wb3J0IHsgZmVkZXJhdGlvbiB9IGZyb20gXCJAbW9kdWxlLWZlZGVyYXRpb24vdml0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICB0YWlsd2luZGNzcygpLFxuICAgIGZlZGVyYXRpb24oe1xuICAgICAgbmFtZTogXCJjaGVja291dFwiLFxuICAgICAgZmlsZW5hbWU6IFwicmVtb3RlRW50cnkuanNcIixcbiAgICAgIGV4cG9zZXM6IHsgXCIuL0NoZWNrb3V0UGFnZVwiOiBcIi4vc3JjL0NoZWNrb3V0UGFnZS50c3hcIiB9LFxuICAgICAgc2hhcmVkOiB7XG4gICAgICAgIHJlYWN0OiB7IHNpbmdsZXRvbjogdHJ1ZSwgcmVxdWlyZWRWZXJzaW9uOiBcIl4xOS4wLjBcIiB9LFxuICAgICAgICBcInJlYWN0LWRvbVwiOiB7IHNpbmdsZXRvbjogdHJ1ZSwgcmVxdWlyZWRWZXJzaW9uOiBcIl4xOS4wLjBcIiB9LFxuICAgICAgICBcInJlYWN0LXJlZHV4XCI6IHsgc2luZ2xldG9uOiB0cnVlLCByZXF1aXJlZFZlcnNpb246IFwiXjkuMC4wXCIgfSxcbiAgICAgICAgXCJAcmVkdXhqcy90b29sa2l0XCI6IHsgc2luZ2xldG9uOiB0cnVlLCByZXF1aXJlZFZlcnNpb246IFwiXjIuMC4wXCIgfSxcbiAgICAgICAgXCJAZ3JlZW5jYXJ0L3N0b3JlXCI6IHsgc2luZ2xldG9uOiB0cnVlLCByZXF1aXJlZFZlcnNpb246IFwiKlwiIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBzZXJ2ZXI6IHsgcG9ydDogMzAwNCwgc3RyaWN0UG9ydDogdHJ1ZSwgY29yczogdHJ1ZSB9LFxuICBwcmV2aWV3OiB7IHBvcnQ6IDMwMDQsIHN0cmljdFBvcnQ6IHRydWUsIGNvcnM6IHRydWUgfSxcbiAgYnVpbGQ6IHsgdGFyZ2V0OiBcImVzbmV4dFwiLCBtb2R1bGVQcmVsb2FkOiBmYWxzZSwgY3NzQ29kZVNwbGl0OiBmYWxzZSB9LFxuICB0ZXN0OiB7XG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBlbnZpcm9ubWVudDogXCJqc2RvbVwiLFxuICAgIHNldHVwRmlsZXM6IFtcIi4vc3JjL3Rlc3Qvc2V0dXAudHNcIl0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFksU0FBUyxvQkFBb0I7QUFDdmEsT0FBTyxXQUFXO0FBQ2xCLE9BQU8saUJBQWlCO0FBQ3hCLFNBQVMsa0JBQWtCO0FBRTNCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLFdBQVc7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFNBQVMsRUFBRSxrQkFBa0IseUJBQXlCO0FBQUEsTUFDdEQsUUFBUTtBQUFBLFFBQ04sT0FBTyxFQUFFLFdBQVcsTUFBTSxpQkFBaUIsVUFBVTtBQUFBLFFBQ3JELGFBQWEsRUFBRSxXQUFXLE1BQU0saUJBQWlCLFVBQVU7QUFBQSxRQUMzRCxlQUFlLEVBQUUsV0FBVyxNQUFNLGlCQUFpQixTQUFTO0FBQUEsUUFDNUQsb0JBQW9CLEVBQUUsV0FBVyxNQUFNLGlCQUFpQixTQUFTO0FBQUEsUUFDakUsb0JBQW9CLEVBQUUsV0FBVyxNQUFNLGlCQUFpQixJQUFJO0FBQUEsTUFDOUQ7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxRQUFRLEVBQUUsTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLEtBQUs7QUFBQSxFQUNuRCxTQUFTLEVBQUUsTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLEtBQUs7QUFBQSxFQUNwRCxPQUFPLEVBQUUsUUFBUSxVQUFVLGVBQWUsT0FBTyxjQUFjLE1BQU07QUFBQSxFQUNyRSxNQUFNO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixZQUFZLENBQUMscUJBQXFCO0FBQUEsRUFDcEM7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
