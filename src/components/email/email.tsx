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
		<div className="flex h-full w-full max-w-[1000px] flex-col justify-between">
			{messages.length === 0 && <GetStartedMail />}

			<EmailMessages />

			<div className="shadow-[-10px_0px_20px_10px_rgba(255,255,255,75)]">
				<EmailForm />
			</div>
		</div>
	);
};
