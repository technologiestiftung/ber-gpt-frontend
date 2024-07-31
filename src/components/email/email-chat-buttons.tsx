import React from "react";
import { SecondaryButton } from "../buttons/secondary-button";
import { useIsLoadingStore } from "../../store/is-loading-store";
import { useChatHistoryStore } from "../../store/history-stores/chat-history-store";
import { streamChatResponse } from "../../store/api";

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

	useChatHistoryStore.getState().saveMessage(value);

	await streamChatResponse(useChatHistoryStore);

	useIsLoadingStore.getState().setIsLoading(false);
}

export const EmailChatButtons: React.FC = () => {
	return (
		<div className="flex gap-2 border-t border-mid-grey pt-2">
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
