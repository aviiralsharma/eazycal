const isVercel = process.env.VERCEL === '1'

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isVercel || process.env.NODE_ENV === 'development', // ⬅ disables PWA only on Vercel builds
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withPWA(nextConfig)
