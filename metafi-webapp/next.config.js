/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PROVIDERURL: process.env.PROVIDERURL,
  },
}

module.exports = nextConfig
