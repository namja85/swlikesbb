/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/salary',
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
