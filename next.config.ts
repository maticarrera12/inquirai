import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['next-mdx-remote'],
  devIndicators: false,
  serverExternalPackages:['pino', 'pino-prettier'],
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname:"img.freepik.com",
        port:"" 
      },
      {
        protocol: "https",
        hostname:"avatars.githubusercontent.com",
        port:"" 
      },  
      {
        protocol: "https",
        hostname:"lh3.googleusercontent.com",
        port:"" 
      },
    ]
  }
};

export default nextConfig;
