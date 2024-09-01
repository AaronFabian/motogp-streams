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
			{
				protocol: 'https',
				hostname: 'resources.motogp.pulselive.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'static-files.motogp.pulselive.com',
				port: '',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
