import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  // const API_URL = env.API_URL;
  const PORT = parseInt(env.VITE_PORT);

  return {
    plugins: [react()],

    server: {
      port: PORT,
      host: false,
    },

    resolve: {
      alias: {
        src: "/src",
        api: "/src/api",
        assets: "/src/assets",
        components: "/src/components",
        contexts: "/src/contexts",
        router: "/src/router",
        stores: "/src/stores",
        styles: "/src/styles",
        types: "/src/types",
        views: "/src/views",
      },
    },
  };
});
