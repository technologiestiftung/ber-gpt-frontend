import React from "react";
import { EmailChatForm } from "./email-chat-form";
import { EmailChatMessages } from "./email-chat-messages";
import { Help } from "../help/help";

export const EmailChat: React.FC = () => {
	return (
		<div className="flex h-full flex-col items-center justify-between pt-16 pb-5 relative">
			<Help />

			<EmailChatMessages />

			<EmailChatForm />
		</div>
	);
};
