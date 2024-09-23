/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     domains: ['localhost', '14.224.188.206']
    // },
    images: {
        // ... other experimental features
        // serverActions: true, // Enable Server Actions if you're using them
        remotePatterns: [
            {
                protocol: 'http', // Or 'https' if using SSL
                hostname: 'localhost', // Replace with your development server hostname
                port: '4000', // Replace with your development server port
                pathname: '/**', // Or a more specific path if needed
            },
            {
                // protocol: 'http', // Or 'https' if using SSL
                hostname: '14.224.188.206', // Replace with your production server hostname or IP
                port: '4000', // Replace with your production server port
                pathname: '/**', // Or a more specific path if needed
            },
        ],
    },
};

export default nextConfig;
