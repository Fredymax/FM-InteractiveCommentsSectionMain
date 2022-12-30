import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "./",
  resolve: {
    alias: [
      {
        find: /^@\//,
        replacement: "/src/",
      },
    ],
  },
  plugins: [vue()],
});
