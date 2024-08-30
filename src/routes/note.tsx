import React from "react";
import { Layout } from "../layout/layout";
import { InfoIcon } from "../components/icons/info-icon";

export const Note: React.FC = () => {
	return (
		<Layout>
			<div className="flex h-full w-full items-center justify-center">
				<div className=" sm:w-[575px] px-5 text-center items-center flex flex-col gap-2">
					<div
						className={`flex flex-row gap-3 w-fit text-xs border border-ber-darker-grey rounded-full px-3 py-1 `}
					>
						<InfoIcon /> Bald verfügbar
					</div>
					<div className="text-3xl font-bold text-ber-darker-grey">
						Vermerk erstellen
					</div>
					<div className="text-md text-ber-darker-grey">
						Der Vermerk-Assistent unterstützt Sie, aussagekräftige und leicht
						verständliche Sachverhalte, Entscheidungen und Hinweise zu
						formulieren.
					</div>
				</div>
			</div>
		</Layout>
	);
};
