import React from "react";
import { Layout } from "../layout/layout";

export const Note: React.FC = () => {
	return (
		// @ts-expect-error this is a placeholder and will be correctly implemented later
		<Layout>
			<div className="flex h-full w-full flex-col items-center justify-center">
				<h1 className="text-4xl font-bold">Bald verfügbar: Vermerk Hilfe</h1>
			</div>
		</Layout>
	);
};
