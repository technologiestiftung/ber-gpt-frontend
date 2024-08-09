import React from "react";
import { Layout } from "../layout/layout";
import { InfoIcon } from "../components/icons/info-icon";

export const Note: React.FC = () => {
	return (
		<Layout>
			<div className="flex h-full w-full items-center justify-center">
				<div className=" md:w-[640px] px-5 text-center items-center flex flex-col gap-2">
					<div
						className={`flex flex-row gap-3 w-fit text-xs border border-black rounded-full px-3 py-1 `}
					>
						<InfoIcon /> Bald verfügbar
					</div>
					<h1 className="text-3xl md:text-5xl font-bold text-darker-grey pb-4">
						Vermerk erstellen
					</h1>
					<div className="md:text-xl text-darker-grey">
						Der Vermerk-Assistent unterstützt Sie, aussagekräftige und leicht
						verständliche Sachverhalte, Entscheidungen und Hinweise zu
						formulieren.
					</div>
				</div>
			</div>
		</Layout>
	);
};
