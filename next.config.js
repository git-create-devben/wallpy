/** @type {import('next').NextConfig} */
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
        //   port: '',
        //   pathname: '/account123/**',
        },
      ],
    },
  }
