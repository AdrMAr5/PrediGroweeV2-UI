/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'predigrowee.agh.edu.pl'],
  },
  serverRuntimeConfig: {
    AUTH_SERVICE_URL: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL,
    QUIZ_SERVICE_URL: process.env.NEXT_PUBLIC_QUIZ_SERVICE_URL,
    STATS_SERVICE_URL: process.env.NEXT_PUBLIC_STATS_SERVICE_URL,
    IMAGES_SERVICE_URL: process.env.NEXT_PUBLIC_IMAGES_SERVICE_URL,
  },
  publicRuntimeConfig: {
    AUTH_SERVICE_URL: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL,
    QUIZ_SERVICE_URL: process.env.NEXT_PUBLIC_QUIZ_SERVICE_URL,
    STATS_SERVICE_URL: process.env.NEXT_PUBLIC_STATS_SERVICE_URL,
    IMAGES_SERVICE_URL: process.env.NEXT_PUBLIC_IMAGES_SERVICE_URL,
  },
};

export default nextConfig;
