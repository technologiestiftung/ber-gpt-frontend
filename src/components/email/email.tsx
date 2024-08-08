import React from "react";
import { GetStartedMail } from "./get-started-mail";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { EmailForm } from "./email-form";
import { EmailMessages } from "./email-messages";
import { useChatHistoryStore } from "../../store/chat-history-store";

export const Email: React.FC = () => {
	const { getChat } = useChatHistoryStore();
	const { currentChatId } = useCurrentChatIdStore();
	const messages = getChat(currentChatId)?.messages || [];

	return (
		<div className="flex h-full flex-col items-center justify-between pt-12 md:py-5">
			{messages.length === 0 && <GetStartedMail />}

			<EmailMessages />

			<EmailForm />
		</div>
	);
};
