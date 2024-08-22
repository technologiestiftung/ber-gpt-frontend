import React from "react";
import { GetStartedMail } from "./get-started-mail";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { EmailForm } from "./email-form/email-form";
import { EmailMessages } from "./email-messages";
import { useChatHistoryStore } from "../../store/chat-history-store";

export const Email: React.FC = () => {
	const { getChat } = useChatHistoryStore();
	const { currentChatId } = useCurrentChatIdStore();
	const messages = getChat(currentChatId)?.messages || [];

	return (
		<div className="flex h-full flex-col items-center justify-between pt-16 md:py-5 relative">
			{messages.length === 0 && <GetStartedMail />}

			<EmailMessages />

			<EmailForm />

			<label className="inline-flex items-center cursor-pointer absolute top-5 left-5">
				<input
					type="checkbox"
					value=""
					className="sr-only peer"
					onChange={() => {
						window.location.href = "/email-chat";
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
