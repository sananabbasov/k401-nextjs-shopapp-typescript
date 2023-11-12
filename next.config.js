/** @type {import('next').NextConfig} */

module.exports = {
    env: {
        baseUrl: 'https://localhost:7037/api',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com',
            },
        ],
    },
}
