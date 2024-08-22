import React from "react";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { EmailChatForm } from "./email-chat-form/email-chat-form";
import { GetStartedEmailChat } from "./get-started-email-chat";
import { EmailChatMessages } from "./email-chat-messages";
import { useChatHistoryStore } from "../../store/chat-history-store";

export const EmailChat: React.FC = () => {
	const { getChat } = useChatHistoryStore();
	const { currentChatId } = useCurrentChatIdStore();
	const messages = getChat(currentChatId)?.messages || [];

	return (
		<div className="flex h-full flex-col items-center justify-between pt-16 md:py-5 relative">
			{messages.length === 0 && <GetStartedEmailChat />}

			<EmailChatMessages />

			<EmailChatForm />
		</div>
	);
};
