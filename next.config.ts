import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Det ligger en package-lock.json lenger oppe i hjemmekatalogen; uten dette
  // gjetter Turbopack feil prosjektrot og advarer ved hvert bygg.
  turbopack: { root: path.resolve(".") },
};

export default nextConfig;
