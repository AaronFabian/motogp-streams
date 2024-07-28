import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: 'selector',
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				alert: '#CC0000',
				primary: {
					gold: {
						500: '#FFB900',
					},
					black: {
						500: '#0D0D0F',
					},
					white: {
						500: '#fefefe',
					},
					gray: {
						500: '#303036',
						800: '#131313',
					},
				},
				dim: {
					gold: 'rgba(255, 185, 1, 0.38)',
					white: 'rgba(254, 254, 254, 0.2)',
				},
			},
		},
	},
	plugins: [],
};

export default config;
