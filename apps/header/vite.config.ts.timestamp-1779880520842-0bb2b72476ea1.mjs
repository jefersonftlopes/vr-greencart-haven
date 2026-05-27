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
      name: "header",
      filename: "remoteEntry.js",
      exposes: {
        "./Header": "./src/Header.tsx"
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
        "react-redux": { singleton: true, requiredVersion: "^9.0.0" },
        "@reduxjs/toolkit": { singleton: true, requiredVersion: "^2.0.0" },
        "@greencart/store": { singleton: true, requiredVersion: "*" }
      }
    })
  ],
  server: { port: 3001, strictPort: true, cors: true },
  preview: { port: 3001, strictPort: true, cors: true },
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvamVmZXJzb25sb3Blcy9Eb2N1bWVudHMvUHJvamV0b3MvdnItZ3JlZW5jYXJ0LWhhdmVuL2FwcHMvaGVhZGVyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvamVmZXJzb25sb3Blcy9Eb2N1bWVudHMvUHJvamV0b3MvdnItZ3JlZW5jYXJ0LWhhdmVuL2FwcHMvaGVhZGVyL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qZWZlcnNvbmxvcGVzL0RvY3VtZW50cy9Qcm9qZXRvcy92ci1ncmVlbmNhcnQtaGF2ZW4vYXBwcy9oZWFkZXIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAnQHRhaWx3aW5kY3NzL3ZpdGUnO1xuaW1wb3J0IHsgZmVkZXJhdGlvbiB9IGZyb20gJ0Btb2R1bGUtZmVkZXJhdGlvbi92aXRlJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgdGFpbHdpbmRjc3MoKSxcbiAgICBmZWRlcmF0aW9uKHtcbiAgICAgIG5hbWU6ICdoZWFkZXInLFxuICAgICAgZmlsZW5hbWU6ICdyZW1vdGVFbnRyeS5qcycsXG4gICAgICBleHBvc2VzOiB7XG4gICAgICAgICcuL0hlYWRlcic6ICcuL3NyYy9IZWFkZXIudHN4JyxcbiAgICAgIH0sXG4gICAgICBzaGFyZWQ6IHtcbiAgICAgICAgcmVhY3Q6IHsgc2luZ2xldG9uOiB0cnVlLCByZXF1aXJlZFZlcnNpb246ICdeMTkuMC4wJyB9LFxuICAgICAgICAncmVhY3QtZG9tJzogeyBzaW5nbGV0b246IHRydWUsIHJlcXVpcmVkVmVyc2lvbjogJ14xOS4wLjAnIH0sXG4gICAgICAgICdyZWFjdC1yZWR1eCc6IHsgc2luZ2xldG9uOiB0cnVlLCByZXF1aXJlZFZlcnNpb246ICdeOS4wLjAnIH0sXG4gICAgICAgICdAcmVkdXhqcy90b29sa2l0JzogeyBzaW5nbGV0b246IHRydWUsIHJlcXVpcmVkVmVyc2lvbjogJ14yLjAuMCcgfSxcbiAgICAgICAgJ0BncmVlbmNhcnQvc3RvcmUnOiB7IHNpbmdsZXRvbjogdHJ1ZSwgcmVxdWlyZWRWZXJzaW9uOiAnKicgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIHNlcnZlcjogeyBwb3J0OiAzMDAxLCBzdHJpY3RQb3J0OiB0cnVlLCBjb3JzOiB0cnVlIH0sXG4gIHByZXZpZXc6IHsgcG9ydDogMzAwMSwgc3RyaWN0UG9ydDogdHJ1ZSwgY29yczogdHJ1ZSB9LFxuICBidWlsZDogeyB0YXJnZXQ6ICdlc25leHQnLCBtb2R1bGVQcmVsb2FkOiBmYWxzZSwgY3NzQ29kZVNwbGl0OiBmYWxzZSB9LFxuICB0ZXN0OiB7XG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcbiAgICBzZXR1cEZpbGVzOiBbJy4vc3JjL3Rlc3Qvc2V0dXAudHMnXSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvWSxTQUFTLG9CQUFvQjtBQUNqYSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUyxrQkFBa0I7QUFFM0IsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osV0FBVztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLFFBQ1AsWUFBWTtBQUFBLE1BQ2Q7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLE9BQU8sRUFBRSxXQUFXLE1BQU0saUJBQWlCLFVBQVU7QUFBQSxRQUNyRCxhQUFhLEVBQUUsV0FBVyxNQUFNLGlCQUFpQixVQUFVO0FBQUEsUUFDM0QsZUFBZSxFQUFFLFdBQVcsTUFBTSxpQkFBaUIsU0FBUztBQUFBLFFBQzVELG9CQUFvQixFQUFFLFdBQVcsTUFBTSxpQkFBaUIsU0FBUztBQUFBLFFBQ2pFLG9CQUFvQixFQUFFLFdBQVcsTUFBTSxpQkFBaUIsSUFBSTtBQUFBLE1BQzlEO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUSxFQUFFLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxLQUFLO0FBQUEsRUFDbkQsU0FBUyxFQUFFLE1BQU0sTUFBTSxZQUFZLE1BQU0sTUFBTSxLQUFLO0FBQUEsRUFDcEQsT0FBTyxFQUFFLFFBQVEsVUFBVSxlQUFlLE9BQU8sY0FBYyxNQUFNO0FBQUEsRUFDckUsTUFBTTtBQUFBLElBQ0osU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsWUFBWSxDQUFDLHFCQUFxQjtBQUFBLEVBQ3BDO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
