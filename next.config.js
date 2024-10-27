/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
  };
  
  module.exports = nextConfig;

  
  // const nextConfig = {
  //   experimental: {
  //   missingSuspenseWithCSRBailout: false,
  //   },
  //   };
