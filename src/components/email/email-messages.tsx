import React from "react";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import ReactMarkdown from "react-markdown";

export const EmailMessages: React.FC = () => {
	const { getChat } = useChatHistoryStore();
	const { currentChatId } = useCurrentChatIdStore();

	const messages = getChat(currentChatId)?.messages || [];

	return (
		<div className="shadown-chat flex flex-col gap-y-4 overflow-auto pb-2">
			{messages.map((message) => (
				<React.Fragment key={message.id}>
					<div
						className={`max-w-[60%] rounded border-2 p-4 shadow-md ${message.role === "user" ? "self-end border-mid-grey" : "self-start border-dark-blue"} `}
					>
						<ReactMarkdown className="markdown-container">
							{message.content === "" ? "..." : message.content}
						</ReactMarkdown>
					</div>
				</React.Fragment>
			))}
		</div>
	);
};
