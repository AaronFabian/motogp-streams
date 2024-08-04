/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				port: '',
				pathname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'https://scdn.line-apps.com',
				port: '',
				pathname: 'https://scdn.line-apps.com',
			},
		],
	},
	env: {
		NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
	},
};

export default nextConfig;
