import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Standalone output for optimized AWS Amplify deployment
  output: 'standalone',

  // Optimize for modern browsers (reduce polyfills)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  images: {
    // Unoptimized images to reduce build size and processing time
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.compl-ai.co.uk',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/**',
      },
    ],
  },

  // Optimize output
  poweredByHeader: false,
  compress: true,

  // Production optimizations
  productionBrowserSourceMaps: false,

  // Turbopack configuration for faster builds
  turbopack: {
    // Configure Turbopack root directory
    root: process.cwd(),
  },

  // Experimental features for optimization
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Optimize package imports for faster builds and smaller bundles
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-accordion',
      '@radix-ui/react-avatar',
      '@radix-ui/react-label',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slot',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
    ],
  },

  async headers() {
    return [
      // Hashed Next.js build assets (immutable)
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      // Next.js image optimizer endpoint
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },

      // Public images
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      // SVGs anywhere
      {
        source: '/:path*.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
