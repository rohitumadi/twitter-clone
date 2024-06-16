/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        // pathname: ""
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
