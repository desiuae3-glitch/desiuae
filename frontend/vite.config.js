import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { utopicrxRewritePlugin } from "./scripts/vite-utopicrx-rewrites.mjs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), utopicrxRewritePlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) {
              return "vendor";
            }
            if (id.includes("@radix-ui")) {
              return "ui";
            }
          }
        },
      },
    },
  },
});
