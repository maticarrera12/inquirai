import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages:['pino', 'pino-prettier'],
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname:"img.freepik.com",
        port:"" 
      }
    ]
  }
};

export default nextConfig;
