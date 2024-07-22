import globals from "globals";
import technologiestiftung from "@technologiestiftung/eslint-config";
import { plugin as tsbPlugin } from "@technologiestiftung/eslint-plugin";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";

// eslint-disable-next-line @technologiestiftung/no-default-export
export default [
	...technologiestiftung,
	reactRecommended,
	{
		files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			"@technologiestiftung/no-default-export": "error",
			// suppress errors for missing 'import React' in files
			"react/react-in-jsx-scope": "off",
		},
		plugins: { "@technologiestiftung": tsbPlugin },
	},
];
