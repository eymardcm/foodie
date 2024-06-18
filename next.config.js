/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "foodieapp.blob.core.windows.net",
            port: "",
            pathname: "/images/**",
          },
        ],
      },
}

module.exports = nextConfig
