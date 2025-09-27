import type { NextConfig } from "next";
import { config as loadEnv } from "dotenv";
import { resolve } from "path";

// Load env from repo root so web/ can access ../.env
loadEnv({ path: resolve(__dirname, "../.env") });

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
