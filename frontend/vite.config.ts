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
      host: true,
    },

    resolve: {
      alias: {
        src: "/src",
        components: "/src/components",
        styles: "/src/styles",
        views: "/src/views",
        assets: "/src/assets",
      },
    },
  };
});
