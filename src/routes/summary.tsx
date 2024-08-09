import React from "react";
import { Layout } from "../layout/layout";
import { PDFIcon } from "../components/icons/pdf-icon";

export const Summary: React.FC = () => {
	return (
		<Layout>
			<div className="flex h-full w-full items-center justify-center">
				<div className=" md:w-[640px] px-5 text-center items-center flex flex-col gap-6">
					<div
						className={`flex flex-row gap-3 w-fit rounded-sm px-4 py-2.5 bg-ber-pink`}
					>
						<PDFIcon /> Text zusammenfassen
					</div>
					<h1 className="text-5xl font-bold">Bald verfügbar</h1>
					<div className="text-xl ">
						Mit der Funktion &quot;Zusammenfassen&quot; können Sie längere Text
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
