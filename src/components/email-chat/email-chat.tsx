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

			<label className="inline-flex items-center cursor-pointer absolute top-5 left-5">
				<input
					type="checkbox"
					value=""
					checked={true}
					className="sr-only peer"
					onChange={() => {
						window.location.href = "/email";
					}}
				/>
				<div className="relative w-9 h-5 bg-ber-light-grey rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-ber-light-grey after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-ber-darker-grey"></div>
				<span className="ms-2 text-xs font-medium text-ber-darker-grey">
					E-Mail Chat
				</span>
			</label>
		</div>
	);
};
