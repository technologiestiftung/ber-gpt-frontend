import React from "react";
import { BaerIcon } from "../icons/bear-icon";

export const GetStartedMail: React.FC = () => {
	return (
		<div className="flex w-full flex-col items-center justify-center overflow-auto">
			<div className="flex min-h-[70px] w-[70px] items-center justify-center rounded-full bg-white drop-shadow-lg">
				<BaerIcon />
			</div>
			<h2 className="pb-2 pt-4 text-xl">
				Starte mit <b>BärGPT!</b>
			</h2>
			<div
				className={`mt-2 max-w-[60%] flex-col self-start rounded border-2 border-dark-blue p-2 shadow-md`}
			>
				<div className="mb-2 flex min-h-[37px] w-[37px] items-center justify-center rounded-full bg-white drop-shadow-lg">
					<BaerIcon className="h-[21px] w-[21px]" />
				</div>
				<div className="p-2">
					<p className="font-semibold">
						Hallo, ich helfe Ihnen gerne bei der Formulierung von E–Mails!
					</p>
					<p>
						Könnten Sie mir bitte ein paar Informationen dazu geben? Je mehr
						Details Sie mir geben, desto besser kann ich die E-Mail für Sie
						formulieren.
					</p>
				</div>
			</div>
		</div>
	);
};
