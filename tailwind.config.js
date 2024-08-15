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
				"lighter-grey": "#F5F5F5",
				"light-grey": "#ECECEC",
				"mid-grey": "#D7D7D7",
				"sidebar-grey": "#F7F7F7",
				grey: "#666",
				"dark-grey": "#999999;",
				"darker-grey": "#333333",
				"ber-yellow": "#FFE612",
				"ber-yellow-darker": "#E0CA00",
				"ber-blue": "#AAC9E7",
				"ber-blue-darker": "#70A3D7",
				"ber-green": "#9BCEAE",
				"ber-green-darker": "#69B585",
				"ber-pink": "#F5B3CB",
				"ber-pink-darker": "#EF81A9",
				"ber-link-grey": "#808080",
				orange: "#F29301",
			},
			fontFamily: {
				arial: ["Arial"],
			},
		},
	},
	plugins: [],
};
