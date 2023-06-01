/* eslint-disable no-undef */
import { resolve } from "path";
import { defineConfig } from "vite";
export default defineConfig({
  dotenv: true,
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        contact: resolve(__dirname, "contact.html"),
        blog: resolve(__dirname, "about.html"),
        blogDetail: resolve(__dirname, "details.html"),
      },
    },
  },
});
