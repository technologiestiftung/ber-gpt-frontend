import React, { useState } from "react";
import { GetStartedMail } from "./get-started-mail";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { EmailForm } from "./email-form/email-form";
import { EmailMessages } from "./email-messages";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { EmailFormSinglePrompt } from "./email-form-single-prompt/email-form-single-prompt";

export const Email: React.FC = () => {
	const { getChat } = useChatHistoryStore();
	const { currentChatId } = useCurrentChatIdStore();
	const messages = getChat(currentChatId)?.messages || [];

	const [isEmailFormVisible, setIsEmailFormVisible] = useState(
		"email-formulieren-chat",
	);

	return (
		<div className="flex h-full flex-col items-center justify-between pt-16 md:py-5 relative">
			{messages.length === 0 && <GetStartedMail />}

			<EmailMessages />

			{isEmailFormVisible === "email-formulieren" ? (
				<EmailForm />
			) : (
				<EmailFormSinglePrompt />
			)}
			<select
				onChange={(e) => setIsEmailFormVisible(e.target.value)}
				className="absolute top-4 left-5 bg-ber-lighter-grey rounded-sm p-1 w-fit h-fit text-sm"
			>
				<option value="email-formulieren-chat">
					E-Mail formulieren (Chat)
				</option>
				<option value="email-formulieren">E-Mail formulieren</option>
			</select>
		</div>
	);
};
