import React from "react";
import { SecondaryButton } from "../buttons/secondary-button";
import { useIsLoadingStore } from "../../store/is-loading-store";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { streamChatResponse } from "../../store/api";

async function onClick(value: string) {
	useIsLoadingStore.getState().setIsLoading(true);

	useChatHistoryStore.getState().saveMessage(value);

	await streamChatResponse();

	useIsLoadingStore.getState().setIsLoading(false);
}

export const HelperButtons: React.FC = () => {
	const helperButtons = [
		{
			label: "E-Mail Hilfe",
			value: "Formuliere einen E–mail Text für mich.",
		},
		{
			label: "Vermerk Generieren",
			value: "Generiere mir einen Vermerk.",
		},
		{
			label: "Text Zusammenfassen",
			value: "Hilf mir Texte und PDF´s zusammenzufassen.",
		},
	];

	return (
		<div className="flex gap-2">
			{helperButtons.map(({ label, value }) => (
				<SecondaryButton
					key={label}
					label={label}
					onClick={() => onClick(value)}
				/>
			))}
		</div>
	);
};
