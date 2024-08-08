import React from "react";
import { BaerIcon } from "../icons/bear-icon";

export const GetStartedMail: React.FC = () => {
	return (
		<div className="flex md:w-[640px] max-w-full flex-row overflow-auto">
			<div className="flex size-[37px] min-w-[37px]  items-center justify-center rounded-full bg-white drop-shadow-md">
				<BaerIcon className="h-[21px] w-[21px]" />
			</div>
			<div className="px-3">
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
	);
};
