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

	const [isEmailFormVisible, setIsEmailFormVisible] =
		useState("single-prompt-form");

	return (
		<div className="flex h-full flex-col items-center justify-between pt-16 md:py-5 relative">
			{messages.length === 0 && <GetStartedMail />}

			<EmailMessages />

			{isEmailFormVisible === "current-form" ? (
				<EmailForm />
			) : (
				<EmailFormSinglePrompt />
			)}
			<select
				onChange={(e) => setIsEmailFormVisible(e.target.value)}
				className="absolute top-4 left-5 bg-ber-lighter-grey rounded-sm p-1 w-fit h-fit text-sm"
			>
				<option value="current-form">Current Form</option>
				<option value="single-prompt-form">Single Prompt Form</option>
			</select>
		</div>
	);
};
