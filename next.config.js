/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: "custom",
        loaderFile: './node_modules/@uploadcare/nextjs-loader/build/loader.js'
      }
}

module.exports = nextConfig
