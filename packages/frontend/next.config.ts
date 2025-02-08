import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.nba.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
