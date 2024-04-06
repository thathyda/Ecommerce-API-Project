/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "standalone",
    images: {
        domains: ['robohash.org', 'store.istad.co' ],
    },
}


export default nextConfig;
