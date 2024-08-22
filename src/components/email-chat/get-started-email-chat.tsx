import React from "react";
import { BaerIcon } from "../icons/bear-icon";
import { TagButton } from "../buttons/tag-button";
import { useIsLoadingStore } from "../../store/is-loading-store";
import { useHasUserScrolledStore } from "../../store/has-user-scrolled-store";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { streamChatResponse } from "../../store/api";

const mailStartPrompts = [
	{
		label: "Neue E-Mail schreiben",
		value: "Ich möchte eine neue E-Mail schreiben.",
	},
	{
		label: "Auf E-Mail antworten",
		value: "Ich möchte auf eine E-Mail antworten.",
	},
	{
		label: "Hilfe zum Verfassen von E-Mails bekommen",
		value: "Wie kann ich hier eine E-Mail verfassen?",
	},
];

async function onClick(value: string) {
	useIsLoadingStore.getState().setIsLoading(true);
	useHasUserScrolledStore.getState().setHasUserScrolled(false);

	useChatHistoryStore.getState().saveMessage(value);

	await streamChatResponse().catch(console.error);

	useIsLoadingStore.getState().setIsLoading(false);
}

export const GetStartedEmailChat: React.FC = () => {
	return (
		<div className="flex md:w-[640px] lg:w-[768px] max-w-full flex-row overflow-auto px-5">
			<div className="mt-1 flex size-[35px] min-w-[35px] items-center justify-center border border-black bg-white">
				<BaerIcon className="h-[21px] w-[21px]" />
			</div>
			<div className="flex flex-col gap-4 px-3">
				<p>
					Hallo, ich bin Bär GPT und helfe Ihnen gerne bei der Formulierung von
					E-Mails. Gemeinsam erarbeiten wir Schritt für Schritt eine passende
					E-Mail. Was möchten Sie tun?
				</p>
				<div className="flex flex-wrap gap-4">
					{mailStartPrompts.map(({ label, value }) => (
						<TagButton
							key={label}
							label={label}
							onClick={() => onClick(value)}
							ariaLabel={label}
							title={label}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
