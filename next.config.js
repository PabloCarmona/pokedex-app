/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.pokemondb.net',
        port: '',
        pathname: '/artwork/**'
      }
    ]
  }
}

module.exports = nextConfig
