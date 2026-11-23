import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName: "pgm-[local]-[hash:base64:6]",
    },
  },
  build: {
    outDir: "dist/ui",
    emptyOutDir: true,
    cssCodeSplit: false,
    sourcemap: true,
    target: "es2020",
    lib: {
      entry: "src/components/index.ts",
      formats: ["es"],
      fileName: () => "index.js",
      cssFileName: "style",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
});
