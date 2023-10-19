import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Remove to use http
    https: {
      key: fs.readFileSync("ssl/server.key"),
      cert: fs.readFileSync("ssl/server.crt"),
    },
  },
});
