/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    POSTMARK_SERVER_TOKEN: process.env.POSTMARK_SERVER_TOKEN
  }
}

module.exports = nextConfig
