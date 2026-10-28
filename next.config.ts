import type { NextConfig } from "next";

// Apple and Android fetch these to let the app open cuisko.app/r/* links. Apple's file has no
// extension, so without this header it would be served as application/octet-stream.
const JSON_HEADERS = [{ key: "Content-Type", value: "application/json" }];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/.well-known/apple-app-site-association", headers: JSON_HEADERS },
      { source: "/.well-known/assetlinks.json", headers: JSON_HEADERS },
    ];
  },
};

export default nextConfig;
