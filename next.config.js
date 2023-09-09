/** @type {import('next').NextConfig} */
const nextConfig = {
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  // distDir: 'dist',
  async rewrites() {
    return [
      {
        source: '/create-music',
        // http://172.16.21.15 for staging
        // http://172.16.21.25 for production
        destination: 'http://172.16.21.15:13013/api/run_inference/',
      },
    ];
  },
  experimental: {
    proxyTimeout: 1000 * 120,
  },
  images: {
    domains: ['localhost', '127.0.0.1', '192.168.3.110:3000'],
  },
};

module.exports = nextConfig;
