/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PROVIDERURL: process.env.PROVIDERURL,
    BASEURL:process.env.BASEURL
  },
}

module.exports = nextConfig
