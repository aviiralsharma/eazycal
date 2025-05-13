const isVercel = process.env.VERCEL === '1'

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isVercel || process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputFileTracing: false, // 🔧 disable the problematic tracing step
  },
}

module.exports = withPWA(nextConfig)
