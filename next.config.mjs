/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Enable server actions
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
};

export default nextConfig; 