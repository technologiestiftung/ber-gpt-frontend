import React from "react";
import { Layout } from "../layout/layout";
import { InfoIcon } from "../components/icons/info-icon";

export const Summary: React.FC = () => {
	return (
		<Layout>
			<div className="flex h-full w-full items-center justify-center">
				<div className=" md:w-[640px] px-5 text-center items-center flex flex-col gap-2">
					<div
						className={`flex flex-row gap-3 w-fit text-xs border border-black rounded-full px-3 py-1 `}
					>
						<InfoIcon /> Bald verfügbar
					</div>
					<h1 className="text-3xl md:text-5xl font-bold text-ber-darker-grey pb-4">
						Text zusammenfassen
					</h1>
					<div className="md:text-xl text-ber-darker-grey">
						Mit der Funktion &quot;Zusammenfassen&quot; können Sie längere Texte
						einfach auf das Wesentliche reduzieren. So schaffen Sie sich einen
						schnellen Überblick über die Inhalte oder geben Kolleg:innen einen
						schnellen Einblick in das Dokument, welches Sie z.B. per E-Mail
						versenden.
					</div>
				</div>
			</div>
		</Layout>
	);
};
