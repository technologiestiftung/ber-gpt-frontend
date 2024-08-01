import React from "react";
import { Layout } from "../layout/layout";

export const Summary: React.FC = () => {
	return (
		<Layout>
			<div className="flex h-full w-full flex-col items-center justify-center">
				<h1 className="text-4xl font-bold">
					Bald verfügbar: Dokumenten Zusammenfassung Hilfe
				</h1>
			</div>
		</Layout>
	);
};
