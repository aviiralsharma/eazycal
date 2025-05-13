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
  outputFileTracing: false, // ✅ this must be at root in Next.js 14
}

module.exports = withPWA(nextConfig)
