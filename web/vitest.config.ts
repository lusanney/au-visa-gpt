import { defineConfig } from "vitest/config";

// Resolve @/* alias like Next.js tsconfig
const alias = { "@": new URL("./src", import.meta.url).pathname } as const;

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/__tests__/**/*.test.ts"],
    globals: true,
    hookTimeout: 60000,
    testTimeout: 60000,
  },
  resolve: { alias },
});
