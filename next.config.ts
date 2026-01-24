import type { NextConfig } from "next";
import { withLingo } from "@lingo.dev/compiler/next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
  // Limit webpack parallelism to prevent lingo.dev lock file conflicts
  // Required because lingo.dev's lock file doesn't support concurrent access
  webpack: (config) => {
    config.parallelism = 1;
    return config;
  },
};

// Wrap withLingo and remove the turbo setting it forcefully adds
const lingoConfig = withLingo(nextConfig, {
  sourceLocale: "en",
  targetLocales: ["es", "fr", "de", "ja", "pt", "hi", "zh"],
  dev: {
    usePseudotranslator: false,
    // @ts-ignore
    showWidget: false,
  }
});

// Remove Turbopack that lingo.dev forces on (it works fine with plain webpack)
export default (async () => {
  const config = await lingoConfig;
  if (config.experimental) {
    delete config.experimental.turbo;
  }
  return config;
})();