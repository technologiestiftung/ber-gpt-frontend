import React from "react";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { Message } from "../../store/types";
import { TextMessage } from "../messages/text-message";
import { useChatHistoryStore } from "../../store/chat-history-store";

export const EmailMessages: React.FC = () => {
	const { getChat } = useChatHistoryStore();
	const { currentChatId } = useCurrentChatIdStore();

	const messages: Message[] = getChat(currentChatId)?.messages || [];

	return (
		<div className="flex w-full justify-center overflow-auto pb-2 px-5">
			<div className="md:w-[640px] flex flex-col gap-y-4">
				{messages.map((message) => (
					<TextMessage
						key={message.id}
						role={message.role}
						content={message.content}
						messageId={message.id}
					/>
				))}
			</div>
		</div>
	);
};
