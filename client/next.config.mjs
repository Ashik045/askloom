/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // For Google profile images
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com', // For Cloudinary images
        port: '',
        pathname: '/**', // Ensure all paths from Cloudinary are allowed
      },
    ],
  },
};

export default nextConfig;
