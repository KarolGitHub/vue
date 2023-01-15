import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import * as path from "path";
import { VitePWA } from "vite-plugin-pwa";
import viteCompression from "vite-plugin-compression";
const options = { algorithm: "brotliCompress" };
/** @type {import('vite').UserConfig} */
export default defineConfig({
  define: {
    "process.env": {},
  },
  build: {
    sourcemap: "inline",
  },
  plugins: [
    viteCompression(options),
    vue(),
    VitePWA({
      mode: "development",
      srcDir: "src",
      filename: "sw.ts",
      strategies: "injectManifest",
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "Vue 3 Template",
        short_name: "Vue 3",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@/assets",
        replacement: path.resolve(__dirname, "./src/assets"),
      },
      {
        find: "@/components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "@/interface",
        replacement: path.resolve(__dirname, "./src/interface"),
      },
      {
        find: "@/layout",
        replacement: path.resolve(__dirname, "./src/layout"),
      },
      {
        find: "@/plugins",
        replacement: path.resolve(__dirname, "./src/plugins"),
      },
      {
        find: "@/store",
        replacement: path.resolve(__dirname, "./src/store"),
      },
      {
        find: "@/views",
        replacement: path.resolve(__dirname, "./src/views"),
      },
      {
        find: "@/router",
        replacement: path.resolve(__dirname, "./src/router"),
      },
      {
        find: "@/server",
        replacement: path.resolve(__dirname, "./src/server"),
      },
      {
        find: "@/config",
        replacement: path.resolve(__dirname, "./src/config"),
      },
      {
        find: "@/",
        replacement: path.resolve(__dirname, "./src"),
      },
      {
        find: "@/services",
        replacement: path.resolve(__dirname, "./src/services"),
      },
    ],
  },
  optimizeDeps: {
    include: ["lodash"],
  },
});
