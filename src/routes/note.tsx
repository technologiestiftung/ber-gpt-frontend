import React from "react";
import { Layout } from "../layout/layout";
import { VermerkIcon } from "../components/icons/vermerk-icon";

export const Note: React.FC = () => {
	return (
		<Layout>
			<div className="flex h-full w-full items-center justify-center">
				<div className=" md:w-[640px] px-5 text-center items-center flex flex-col gap-6">
					<div
						className={`flex flex-row gap-3 w-fit rounded-sm px-4 py-2.5 bg-ber-yellow`}
					>
						<VermerkIcon /> Vermerk erstellen
					</div>
					<h1 className="text-5xl font-bold">Bald verfügbar</h1>
					<div className="text-xl ">
						Der Vermerk-Assistent unterstützt Sie, aussagekräftige und leicht
						verständliche Sachverhalte, Entscheidungen und Hinweise zu
						formulieren.
					</div>
				</div>
			</div>
		</Layout>
	);
};
