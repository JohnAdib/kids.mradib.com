import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        hub: resolve(import.meta.dirname, "index.html"),
        maths: resolve(import.meta.dirname, "maths/index.html"),
        timesTables: resolve(import.meta.dirname, "maths/times-tables/index.html"),
      },
    },
  },
});
