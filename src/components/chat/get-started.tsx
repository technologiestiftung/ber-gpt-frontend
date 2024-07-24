import React from "react";
import { ChatBoxButton } from "../buttons/chat-box-button";
import { ChatIcon } from "../icons/chat-icon";
import { PDFIcon } from "../icons/pdf-icon";
import { MailIcon } from "../icons/mail-icon";
import { VermerkIcon } from "../icons/vermerk-icon";
import { BaerIcon } from "../icons/bear-icon";

export const GetStarted: React.FC = () => {
	return (
		<div className="flex w-full flex-col items-center justify-center">
			<div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white drop-shadow-lg">
				<BaerIcon />
			</div>
			<h2 className="pb-2 pt-4 text-xl">
				Starte mit <b>BärGPT!</b>
			</h2>
			<div className="flex w-full flex-row flex-wrap justify-center gap-x-7">
				<ChatBoxButton
					icon={<ChatIcon />}
					label={
						<div>
							Erkläre mir was ich mit <b>BärGPT</b> machen kann.
						</div>
					}
				/>
				<ChatBoxButton
					icon={<PDFIcon />}
					label="Hilf mir Texte und PDF´s zusammenzufassen."
				/>
				<ChatBoxButton
					icon={<MailIcon />}
					label="Formuliere einen E–mail Text für mich."
				/>
				<ChatBoxButton
					icon={<VermerkIcon />}
					label="Generiere mir einen Vermerk."
				/>
			</div>
		</div>
	);
};
