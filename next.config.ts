import type { NextConfig } from "next";

// Apple and Android fetch these to let the app open cuisko.app/r/* links. Apple's file has no
// extension, so without this header it would be served as application/octet-stream.
const JSON_HEADERS = [{ key: "Content-Type", value: "application/json" }];

// The page that approves an assistant for an account must never sit inside someone else's frame.
const CONNECT_HEADERS = [{ key: "Content-Security-Policy", value: "frame-ancestors 'none'" }];

const nextConfig: NextConfig = {
  // Next streams a dynamic page's metadata after <head> to any client it does not know as a bot,
  // and link-preview fetchers outside its list (Mastodon, Viber, Snapchat…) read <head> only: a
  // shared recipe link (/r/[id]) would preview bare for them. Every client gets it in <head>; static
  // pages are prerendered, so only a dynamic page's first byte waits for its metadata.
  htmlLimitedBots: /.*/,
  async headers() {
    return [
      { source: "/.well-known/apple-app-site-association", headers: JSON_HEADERS },
      { source: "/.well-known/assetlinks.json", headers: JSON_HEADERS },
      { source: "/connect", headers: CONNECT_HEADERS },
    ];
  },
};

export default nextConfig;
