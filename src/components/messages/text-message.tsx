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
			className={`flex flex-col ${role === "user" ? "self-end shadow-md max-w-[85%] lg:max-w-[80%]" : "self-start"} `}
		>
			<div className={`flex flex-row`}>
				<div
					className={`${role === "assistant" ? "" : "hidden"} mt-3.5 flex size-[37px] min-w-[37px] items-center justify-center rounded-full bg-white drop-shadow-md`}
				>
					<BaerIcon className="h-[21px] w-[21px]" />
				</div>
				<div className="flex flex-col">
					<ReactMarkdown
						className={`markdown-container ${role === "user" ? "bg-light-grey py-2" : ""}`}
					>
						{content === "" ? "..." : content}
					</ReactMarkdown>
					<div
						className={`flex flex-row items-center justify-between gap-3 self-start px-3 py-2 text-dark-blue ${role === "assistant" ? "" : "hidden"}`}
					>
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
			</div>

			{isLastMessageOfChat(messageId) &&
				getStorageKey() === "email-history" && <EmailChatButtons />}
		</div>
	);
};
