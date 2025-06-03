/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  // Disable static exports
  output: 'standalone'
};

module.exports = nextConfig; 