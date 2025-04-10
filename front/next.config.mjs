/** @type {import('next').NextConfig} */

const IMAGE_HOST = process.env.IMAGE_HOST || 'localhost'
const IMAGE_PROTOCOL = process.env.IMAGE_PROTOCOL || 'http'
const IMAGE_PORT = process.env.IMAGE_PORT || ''

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: IMAGE_PROTOCOL,
        hostname: IMAGE_HOST,
        port: IMAGE_PORT || undefined, // Optional
        pathname: '/images/**',
      },
    ],
  },
  reactStrictMode: false,
}

export default nextConfig

