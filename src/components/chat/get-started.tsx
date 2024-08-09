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
import { trackInteraction } from "../../analytics/matomo";

const startingPrompts = [
	{
		icon: <ChatIcon />,
		label: (
			<div>
				Erkläre mir was ich mit <b>BärGPT</b> machen kann.
			</div>
		),
		value: "Erkläre mir was ich mit BärGPT machen kann.",
		backgroundColor: "bg-ber-green hover:bg-ber-green-darker",
	},
	{
		icon: <MailIcon />,
		label: "Formuliere eine E–Mail für mich.",
		value: "Formuliere eine E–mail für mich.",
		backgroundColor: "bg-ber-blue hover:bg-ber-blue-darker",
	},
	{
		icon: <VermerkIcon />,
		label: "Hilf mir einen Vermerk zu erstellen.",
		value: "Hilf mir einen Vermerk zu erstellen.",
		backgroundColor: "bg-ber-yellow hover:bg-ber-yellow-darker",
	},
	{
		icon: <PDFIcon />,
		label: "Hilf mir Texte und PDFs zusammenzufassen.",
		value: "Hilf mir Texte und PDFs zusammenzufassen.",
		backgroundColor: "bg-ber-pink hover:bg-ber-pink-darker",
	},
];

export const GetStarted: React.FC = () => {
	return (
		<div className="flex w-full justify-center overflow-auto pb-2">
			<div className="flex md:w-[600px] flex-col items-center px-5">
				<div className="flex min-h-[50px] w-[50px] items-center justify-center rounded-full bg-white drop-shadow-lg md:min-h-[70px] md:w-[70px]">
					<BaerIcon className="h-8 w-8 md:h-10 md:w-10" />
				</div>
				<h2 className="pt-4 text-xl">
					Starte mit <b>BärGPT</b>!
				</h2>
				<p className="pb-2 pt-2 text-center">
					Sie können <b>BärGPT</b> direkt nutzen, indem Sie Ihre Frage oder Ihr
					Anliegen in das Chatfenster unten eintippen.
				</p>
				<h2 className="pb-2 pt-8 text-xl font-semibold">KI Apps</h2>
				<p className="pb-4 pt-2 text-center">
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
							className={prompt.backgroundColor}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

async function onClick(value: string) {
	useIsLoadingStore.getState().setIsLoading(true);

	trackInteraction({ eventAction: "get-started-click", eventName: value });
	useChatHistoryStore.getState().createChat({ content: value });

	await streamChatResponse();

	useIsLoadingStore.getState().setIsLoading(false);
}
