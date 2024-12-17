/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    async headers() {
      return [
        {
          source: '/apple-app-site-association',
          headers: [
            {
              key: 'Content-Type',
              value: 'application/json',
            },
          ],
        },
      ];
    },
  };
