/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/salary/2023',
        permanent: false
      },
      {
        source: '/salary',
        destination: '/salary/2023',
        permanent: false
      },
    ]
  }
}

module.exports = nextConfig
