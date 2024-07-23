import technologiestiftung from "@technologiestiftung/prettier-config";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// eslint-disable-next-line @technologiestiftung/no-default-export
export default {
	...technologiestiftung,
	plugins: ["prettier-plugin-tailwindcss"],
	tailwindConfig: resolve(__dirname, "./tailwind.config.js"),
};
