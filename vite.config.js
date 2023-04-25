/* eslint-disable no-undef */
import { resolve } from "path";
import { defineConfig } from "vite";
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        // ADD YOUR PAGES HERE
        // contact: resolve(__dirname, "contact.html"),
        // blog: resolve(__dirname, "blogs.html"),
        // blogDetail: resolve(__dirname, "blog-detail.html"),
      },
    },
  },
});
