/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @technologiestiftung/no-default-export
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"ber-lighter-grey": "#F5F5F5",
				"ber-light-grey": "#CCCCCC",
				"ber-mid-grey": "#808080",
				grey: "#666",
				"ber-darker-grey": "#333333",
				"ber-yellow": "#FFE612",
				"ber-yellow-darker": "#E0CA00",
				"ber-blue": "#AAC9E7",
				"ber-blue-darker": "#70A3D7",
				"ber-green": "#9BCEAE",
				"ber-green-darker": "#69B585",
				"ber-pink": "#F5B3CB",
				"ber-pink-darker": "#EF81A9",
				"ber-orange": "#F29301",
			},
			fontFamily: {
				arial: ["Arial"],
			},
		},
	},
	plugins: [],
};
