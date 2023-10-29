/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#ED7D31',
				secondary: '#6C5F5B',
				secondaryDark: '#4F4A45',
				gray: '#F6F1EE',
			},
		},
	},
	plugins: [],
};
