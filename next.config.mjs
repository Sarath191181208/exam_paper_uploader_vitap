/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    experimental: {
        serverActions: {
            allowedOrigins: ['ubiquitous-space-guide-v5vg7qqxv9v2964-3000.app.github.dev', 'localhost:3000'],
        }
    }
};

export default nextConfig;
