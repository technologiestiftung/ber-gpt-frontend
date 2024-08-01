/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @technologiestiftung/no-default-export
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"dark-blue": "#1C2554",
				"mid-blue": "#024F9F",
				"light-blue": "#A9C9E7",
				"light-grey": "#F2F2F2",
				"mid-grey": "#D7D7D7",
				"dark-grey": "#999999;",
				"darker-grey": "#333333",
			},
			fontFamily: {
				arial: ["Arial"],
			},
		},
	},
	plugins: [],
};
