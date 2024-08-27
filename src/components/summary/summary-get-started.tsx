import React from "react";
import { BaerIcon } from "../icons/bear-icon";

export const SummaryGetStarted: React.FC = () => {
	return (
		<div className="flex md:w-[640px] lg:w-[768px] max-w-full flex-row overflow-auto px-5">
			<div className="mt-1 flex size-[35px] min-w-[35px] items-center justify-center border border-black bg-white">
				<BaerIcon className="h-[21px] w-[21px]" />
			</div>
			<div className="flex flex-col gap-1 px-3">
				<p>Hallo, gemeinsam bearbeiten wir Schritt für Schritt Ihren Text.</p>
				<h1 className="text-3xl font-bold">
					Fügen Sie den Text unten in das Eingabefeld ein.
				</h1>
			</div>
		</div>
	);
};
