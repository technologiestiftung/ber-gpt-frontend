import React from "react";
import { SecondaryButton } from "../buttons/secondary-button";
import { useIsLoadingStore } from "../../store/is-loading-store";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { streamChatResponse } from "../../store/api";
import { useIsUserScrollingStore } from "../../store/is-user-scrolling-store";

const formatButtons = [
	{
		label: "Förmlicher",
		value: "Formuliere die E-Mail förmlicher.",
	},
	{
		label: "Informeller",
		value: "Formuliere die E-Mail informeller.",
	},
	{
		label: "Kürzer",
		value: "Formuliere die E-Mail kürzer.",
	},
	{ label: "Länger", value: "Formuliere die E-Mail länger." },
];

async function onClick(value: string) {
	useIsLoadingStore.getState().setIsLoading(true);
	useIsUserScrollingStore.getState().setIsUserScrolling(false);

	useChatHistoryStore.getState().saveMessage(value);

	await streamChatResponse().catch(console.error);

	useIsLoadingStore.getState().setIsLoading(false);
}

export const EmailChatButtons: React.FC = () => {
	return (
		<div
			className={`flex w-fit gap-2 border-t border-mid-grey ml-11 mt-2 pt-2 md:gap-4 
		${useIsLoadingStore.getState().isLoading ? "opacity-0" : "opacity-100"}`}
		>
			{formatButtons.map(({ label, value }) => (
				<SecondaryButton
					key={label}
					label={label}
					onClick={() => onClick(value)}
				/>
			))}
		</div>
	);
};
