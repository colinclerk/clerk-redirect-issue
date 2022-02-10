/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  distDir: './dist/',
  images: {
    domains: [
      'images.clerk.dev',
      'www.gravatar.com',
      'cdn.discordapp.com',
      'pbs.twimg.com',
      'storage.googleapis.com',
      'lh1.googleusercontent.com',
      'lh2.googleusercontent.com',
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh5.googleusercontent.com',
      'lh6.googleusercontent.com',
    ],
  },
};
