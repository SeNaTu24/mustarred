import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/wp-api': {
        target: 'https://cms.mustarred.com/wp-json/wp/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wp-api/, ''),
        secure: true,
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // manualChunks only applies to the browser build — SSR externalises React
        manualChunks: isSsrBuild ? undefined : {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-accordion', '@radix-ui/react-dialog'],
        },
      },
    },
  },
  // SSR build configuration — used only when running: vite build --ssr src/entry-server.tsx
  ssr: {
    // Do not externalise these — they need to be bundled for Node.js compatibility
    noExternal: ['react-helmet-async', 'wouter'],
  },
}));