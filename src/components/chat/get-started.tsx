import React from "react";
import { ChatBoxButton } from "../buttons/chat-box-button";
import { ChatIcon } from "../icons/chat-icon";
import { PDFIcon } from "../icons/pdf-icon";
import { MailIcon } from "../icons/mail-icon";
import { VermerkIcon } from "../icons/vermerk-icon";
import { BaerIcon } from "../icons/bear-icon";

type GetStartedProps = {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const startingPrompts = [
	{
		icon: <ChatIcon />,
		label: (
			<div>
				Erkläre mir was ich mit <b>BärGPT</b> machen kann.
			</div>
		),
		value: "Erkläre mir was ich mit BärGPT machen kann.",
	},
	{
		icon: <PDFIcon />,
		label: "Hilf mir Texte und PDF´s zusammenzufassen.",
		value: "Hilf mir Texte und PDF´s zusammenzufassen.",
	},
	{
		icon: <MailIcon />,
		label: "Formuliere einen E–mail Text für mich.",
		value: "Formuliere einen E–mail Text für mich.",
	},
	{
		icon: <VermerkIcon />,
		label: "Generiere mir einen Vermerk.",
		value: "Generiere mir einen Vermerk.",
	},
];

export const GetStarted: React.FC<GetStartedProps> = ({ onSubmit }) => {
	return (
		<div className="flex w-full flex-col items-center justify-center">
			<div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white drop-shadow-lg">
				<BaerIcon />
			</div>
			<h2 className="pb-2 pt-4 text-xl">
				Starte mit <b>BärGPT!</b>
			</h2>
			<div className="flex w-full flex-row flex-wrap justify-center gap-x-7">
				{startingPrompts.map((prompt) => (
					<form key={prompt.value} onSubmit={onSubmit}>
						<input
							className="hidden"
							name="message"
							type="text"
							value={prompt.value}
						/>
						<ChatBoxButton
							icon={prompt.icon}
							label={prompt.label}
							type={"submit"}
						/>
					</form>
				))}
			</div>
		</div>
	);
};
