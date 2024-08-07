import React from "react";
import { ChatBoxButton } from "../buttons/chat-box-button";
import { ChatIcon } from "../icons/chat-icon";
import { PDFIcon } from "../icons/pdf-icon";
import { MailIcon } from "../icons/mail-icon";
import { VermerkIcon } from "../icons/vermerk-icon";
import { BaerIcon } from "../icons/bear-icon";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { useIsLoadingStore } from "../../store/is-loading-store";
import { streamChatResponse } from "../../store/api";

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
		label: "Formuliere eine E–Mail für mich.",
		value: "Formuliere eine E–mail für mich.",
	},
	{
		icon: <VermerkIcon />,
		label: "Hilf mir einen Vermerk zu erstellen.",
		value: "Hilf mir einen Vermerk zu erstellen.",
	},
	{
		icon: <PDFIcon />,
		label: "Hilf mir Texte und PDFs zusammenzufassen.",
		value: "Hilf mir Texte und PDFs zusammenzufassen.",
	},
];

export const GetStarted: React.FC = () => {
	return (
		<div className="flex w-full flex-col items-center justify-center overflow-auto">
			<div className="flex min-h-[50px] w-[50px] items-center justify-center rounded-full bg-white drop-shadow-lg md:min-h-[70px] md:w-[70px]">
				<BaerIcon className="h-8 w-8 md:h-10 md:w-10" />
			</div>
			<h2 className="pt-4 text-xl">
				Starte mit <b>BärGPT</b>!
			</h2>
			<p className="pb-2 pt-2">
				Sie können <b>BärGPT</b> direkt nutzen, indem Sie Ihre Frage oder Ihr
				Anliegen in das Chatfenster unten eintippen.
			</p>
			<h2 className="pb-2 pt-8 text-xl">KI Apps</h2>
			<p className="pb-4 pt-2">
				<b>BärGPT</b> bietet spezialisierte KI-Funktionen, die Sie bei der
				Erledigung von typischen Aufgaben unterstützen.
				<br />
				Dieses Angebot befindet sich noch im Aufbau und wird stetig erweitert.
			</p>
			<div className="flex w-full flex-row flex-wrap justify-center gap-x-3">
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

async function onClick(value: string) {
	useIsLoadingStore.getState().setIsLoading(true);

	useChatHistoryStore.getState().createChat({ content: value });

	await streamChatResponse();

	useIsLoadingStore.getState().setIsLoading(false);
}
