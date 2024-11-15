import React from "react";
import { useIsLoadingStore } from "../../store/is-loading-store";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { streamChatResponse } from "../../store/api";
import { useHasUserScrolledStore } from "../../store/has-user-scrolled-store";
import { TagButton } from "../buttons/tag-button";

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
	useHasUserScrolledStore.getState().setHasUserScrolled(false);

	useChatHistoryStore.getState().saveMessage(value);

	await streamChatResponse().catch(console.error);

	useIsLoadingStore.getState().setIsLoading(false);
}

export const EmailChatButtons: React.FC = () => {
	return (
		<div
			className={`flex w-fit gap-2 ml-2 text-sm
		${useIsLoadingStore.getState().isLoading ? "opacity-0" : "opacity-100"}`}
		>
			{formatButtons.map(({ label, value }) => (
				<TagButton key={label} label={label} onClick={() => onClick(value)} />
			))}
		</div>
	);
};
