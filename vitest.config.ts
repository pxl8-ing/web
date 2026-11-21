import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const srcPath = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": srcPath,
    },
  },
  test: {
    environment: "node",
    // Vitest's fork watchdog requires IPC channel methods unavailable in Bun 1.4.5.
    pool: "threads",
    include: ["tests/**/*.test.ts"],
  },
});
