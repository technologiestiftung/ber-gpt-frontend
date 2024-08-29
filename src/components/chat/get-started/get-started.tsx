import React from "react";
import { ChatPromptButton } from "../../buttons/chat-prompt-button";
import { BaerIcon } from "../../icons/bear-icon";
import { useChatHistoryStore } from "../../../store/chat-history-store";
import { useIsLoadingStore } from "../../../store/is-loading-store";
import { useHasUserScrolledStore } from "../../../store/has-user-scrolled-store";
import { streamChatResponse } from "../../../store/api";
import { trackInteraction } from "../../../analytics/matomo";
import { GetStartedNavLinks } from "./get-started-nav-links";

const startingPrompts = [
	{
		value: "Wie schreibe ich einen guten Vermerk?",
	},
	{
		value:
			"Schlage mir einige Ideen vor, wozu ich ein LLM in der öffentlichen Verwaltung nutzen kann.",
	},
	{
		value: "Hilf mir dabei, einen Text in eine andere Sprache zu übersetzen.",
	},
];

export const GetStarted: React.FC = () => {
	return (
		<div className="flex w-full justify-center overflow-y-auto overflow-x-hidden pb-2 text-ber-darker-grey">
			<div className="flex w-full h-fit md:w-[640px] lg:w-[768px] flex-col items-center justify-between px-5 md:px-0">
				<div className="flex min-h-[50px] w-[50px] items-center justify-center border border-black bg-white md:min-h-[60px] md:w-[60px]">
					<BaerIcon className="h-8 w-8 md:h-10 md:w-10" />
				</div>
				<div className="py-4 text-3xl md:text-4xl font-bold">
					Starte mit BärGPT!
				</div>
				<p className="pb-4 pt-2 text-center md:text-xl text-sm">
					BärGPT bietet spezialisierte KI-Funktionen, die Sie bei der Erledigung
					von typischen Aufgaben unterstützen. Dieses Angebot befindet sich noch
					im Aufbau und wird stetig erweitert.
				</p>

				<GetStartedNavLinks />

				<div className="pb-2 pt-8 text-xl md:text-2xl font-semibold">Chat</div>
				<p className="pb-2 pt-2 md:text-base text-sm text-center">
					Sie können BärGPT direkt nutzen, indem Sie Ihre Frage oder Ihr
					Anliegen in das Chatfenster unten eintippen oder direkt eine Frage
					auswählen:
				</p>
				<div className="flex flex-row w-full overflow-x-auto px-2 md:px-0 self-start sm:self-center sm:justify-center gap-x-4">
					{startingPrompts.map((prompt) => (
						<ChatPromptButton
							key={prompt.value}
							label={prompt.value}
							onClick={() => onClick(prompt.value)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

async function onClick(value: string) {
	useIsLoadingStore.getState().setIsLoading(true);
	useHasUserScrolledStore.getState().setHasUserScrolled(false);

	trackInteraction({ eventAction: "get-started-click", eventName: value });
	useChatHistoryStore.getState().createChat({ content: value });

	await streamChatResponse();

	useIsLoadingStore.getState().setIsLoading(false);
}
