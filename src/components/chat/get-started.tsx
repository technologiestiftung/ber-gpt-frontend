import React from "react";
import { ChatBoxButton } from "../buttons/chat-box-button";
import { ChatIcon } from "../icons/chat-icon";
import { PDFIcon } from "../icons/pdf-icon";
import { MailIcon } from "../icons/mail-icon";
import { VermerkIcon } from "../icons/vermerk-icon";
import { BaerIcon } from "../icons/bear-icon";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { useIsLoadingStore } from "../../store/is-loading-store";
import { streamChatResponse } from "./api";

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
		icon: <MailIcon />,
		label: "Formuliere einen E–mail Text für mich.",
		value: "Formuliere einen E–mail Text für mich.",
	},
	{
		icon: <VermerkIcon />,
		label: "Generiere mir einen Vermerk.",
		value: "Generiere mir einen Vermerk.",
	},
	{
		icon: <PDFIcon />,
		label: "Hilf mir Texte und PDF´s zusammenzufassen.",
		value: "Hilf mir Texte und PDF´s zusammenzufassen.",
	},
];

export const GetStarted: React.FC = () => {
	return (
		<div className="flex w-full flex-col items-center justify-center overflow-scroll">
			<div className="flex min-h-[70px] w-[70px] items-center justify-center rounded-full bg-white drop-shadow-lg">
				<BaerIcon />
			</div>
			<h2 className="pb-2 pt-4 text-xl">
				Starte mit <b>BärGPT!</b>
			</h2>
			<div className="flex w-full flex-row flex-wrap justify-center gap-x-4">
				{startingPrompts.map((prompt) => (
					<ChatBoxButton
						key={prompt.value}
						icon={prompt.icon}
						label={prompt.label}
						onClick={() => onClick(prompt.value)}
					/>
				))}
			</div>
		</div>
	);
};

function onClick(value: string) {
	useIsLoadingStore.getState().setIsLoading(true);

	const chatId = useChatHistoryStore.getState().createChat(value);

	streamChatResponse(chatId).catch(console.error);

	useIsLoadingStore.getState().setIsLoading(false);
}
