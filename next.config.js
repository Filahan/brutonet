/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    lighthouse: true
  },
  // Optimize for bfcache
  headers: async () => {
    return [
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600'
          }
        ]
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate'
          }
        ]
      }
    ]
  },
  // Disable WebSocket in development
  webpack: (config, { dev }) => {
    if (dev) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        dns: false,
        child_process: false,
        dgram: false,
        'utf-8-validate': false,
        bufferutil: false
      }
    }
    return config
  },
  // Optimize bundle size
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Optimize production builds
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
}

module.exports = nextConfig;
