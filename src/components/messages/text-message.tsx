import React from "react";
import ReactMarkdown from "react-markdown";
import { BaerIcon } from "../icons/bear-icon";
import { RefreshIcon } from "../icons/refresh-icon";
import { CopyToClipboardButton } from "../buttons/copy-to-clipboard-button";
import { streamChatResponse } from "../../store/api";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { EmailChatButtons } from "../email/email-chat-buttons";
import { getStorageKey } from "../../store/storage";

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

	const onRefresh = () => {
		removeMessageFromChat(messageId);
		streamChatResponse().catch(console.error);
	};

	return (
		<div
			className={`max-w-[87%] rounded border-2 p-2 shadow-md sm:max-w-[80%] lg:max-w-[60%] ${role === "user" ? "self-end border-mid-grey" : "self-start border-dark-blue"} `}
		>
			<div
				className={`flex flex-row items-center justify-between gap-2 ${role === "assistant" ? "" : "hidden"}`}
			>
				<div
					className={`mb-2 flex min-h-[37px] w-[37px] items-center justify-center rounded-full bg-white drop-shadow-lg`}
				>
					<BaerIcon className="h-[21px] w-[21px]" />
				</div>
				<div className="flex flex-row items-center gap-3 self-start p-2 text-dark-blue">
					{isLastMessageOfChat(messageId) && (
						<button
							// prettier-ignore
							className="text-dark-blue hover:text-mid-blue"
							aria-label="Neu generieren"
							title="Neu generieren"
							onClick={onRefresh}
						>
							<RefreshIcon />
						</button>
					)}
					<CopyToClipboardButton generatedAnswer={content} />
				</div>
			</div>
			<ReactMarkdown className="markdown-container">
				{content === "" ? "..." : content}
			</ReactMarkdown>

			{isLastMessageOfChat(messageId) &&
				getStorageKey() === "email-history" && <EmailChatButtons />}
		</div>
	);
};
