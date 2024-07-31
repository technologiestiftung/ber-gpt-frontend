import React from "react";
import { useChatHistoryStore } from "../../../store/chat-history-store";
import { useCurrentChatIdStore } from "../../../store/current-chat-id-store";
import { FileMessage } from "./file-message";
import { TextMessage } from "./text-message";

export const ChatMessages: React.FC = () => {
	const { getChat } = useChatHistoryStore();
	const { currentChatId } = useCurrentChatIdStore();

	const messages = getChat(currentChatId)?.messages || [];

	return (
		<div className="shadown-chat flex flex-col gap-y-4 overflow-auto pb-2">
			{messages.map((message) => (
				<React.Fragment key={message.id}>
					{message.type === "file" && (
						<FileMessage fileName={message.fileName} />
					)}

					{message.type === "text" && (
						<TextMessage
							role={message.role}
							content={message.content}
							messageId={message.id}
						/>
					)}
				</React.Fragment>
			))}
		</div>
	);
};
