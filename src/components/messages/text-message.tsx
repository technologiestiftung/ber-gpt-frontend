import React from "react";
import ReactMarkdown from "react-markdown";
import { BaerIcon } from "../icons/bear-icon";
import { RefreshIcon } from "../icons/refresh-icon";
import { CopyToClipboardButton } from "../buttons/copy-to-clipboard-button";
import { streamChatResponse } from "../../store/api";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { EmailChatButtons } from "../email/email-chat-buttons";
import { getStorageKey } from "../../store/storage";
import { useIsLoadingStore } from "../../store/is-loading-store";
import { useHasUserScrolledStore } from "../../store/has-user-scrolled-store";
import { PreformattedTextElement } from "./preformatte-text-element";

interface TextMessageProps {
	role: string;
	content: string;
	messageId: string;
}

export const TextMessage: React.FC<TextMessageProps> = ({
	role,
	content,
	messageId,
}) => {
	const { removeMessageFromChat, isLastMessageOfChat } = useChatHistoryStore();

	const { isLoading, setIsLoading } = useIsLoadingStore();
	const { setHasUserScrolled } = useHasUserScrolledStore();

	const onRefresh = async () => {
		setIsLoading(true);
		setHasUserScrolled(false);
		removeMessageFromChat(messageId);
		await streamChatResponse().catch(console.error);
		setIsLoading(false);
	};

	return (
		<div
			className={`flex flex-col ${role === "user" ? "self-end max-w-[85%] lg:max-w-[80%]" : "self-start pb-4"}`}
		>
			<div className={`flex flex-row`}>
				<div
					className={`${role === "assistant" ? "" : "hidden"} mt-3.5 flex size-[35px] min-w-[35px] items-center justify-center border border-black bg-white`}
				>
					<BaerIcon className="h-[21px] w-[21px]" />
				</div>
				<div className="flex flex-col">
					<ReactMarkdown
						// @ts-expect-error typing too complex
						components={{ pre: PreformattedTextElement }}
						className={`markdown-container ${role === "user" ? "bg-ber-lighter-grey py-2" : ""}`}
					>
						{content === "" ? "..." : content}
					</ReactMarkdown>
					<div
						className={`flex flex-row items-center justify-between gap-3 self-start px-3 py-2 
								${role === "assistant" ? "" : "hidden"}
								${isLoading ? "opacity-0" : "opacity-100"}`}
					>
						{isLastMessageOfChat(messageId) && (
							<button
								// prettier-ignore
								className="text-ber-darker-grey hover:text-ber-dark-grey disabled:text-red-400"
								aria-label="Neu generieren"
								title="Neu generieren"
								onClick={onRefresh}
								disabled={isLoading}
							>
								<RefreshIcon />
							</button>
						)}
						<CopyToClipboardButton generatedAnswer={content} />
					</div>
				</div>
			</div>

			{isLastMessageOfChat(messageId) &&
				role === "assistant" &&
				getStorageKey() === "email-history" && <EmailChatButtons />}
		</div>
	);
};
