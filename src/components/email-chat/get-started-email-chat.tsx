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
		<div className="flex md:w-[640px] lg:w-[768px] max-w-full flex-row overflow-auto  pt-[30%]">
			<div className="mt-1 flex size-[35px] min-w-[35px] items-center justify-center border border-black bg-white">
				<BaerIcon className="h-[21px] w-[21px]" />
			</div>
			<div className="flex flex-col gap-1 px-3">
				<p>Hallo, gemeinsam formulieren wir Schritt für Schritt eine E-Mail.</p>
				<h1 className="text-3xl font-bold">Was möchten Sie tun?</h1>
				<div className="flex flex-wrap gap-4 pt-3">
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
