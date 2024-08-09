import React, { useEffect, useRef } from "react";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { FileMessage } from "../messages/file-message";
import { TextMessage } from "../messages/text-message";
import { Message } from "../../store/types";

export const ChatMessages: React.FC = () => {
	const { getChat } = useChatHistoryStore();
	const { currentChatId } = useCurrentChatIdStore();

	const messages: Message[] = getChat(currentChatId)?.messages || [];

	const messagesEndRef = useRef<null | HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div className="flex w-full justify-center overflow-auto scroll-smooth mb-2">
			<div className="md:w-[640px] w-full flex flex-col gap-y-4 px-5">
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
				<div ref={messagesEndRef} />
			</div>
		</div>
	);
};
