import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "ys84sh-5173.csb.app", // Add the specific host here
      "localhost", // Allow localhost (for local dev)
      "0.0.0.0", // Allow all IP addresses
    ],
  },
});
