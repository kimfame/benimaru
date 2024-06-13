/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // bcrypt should work in the app/ directory, including in Route Handlers
    config.externals = [...config.externals, 'bcrypt']
    return config
  },
}

export default nextConfig
