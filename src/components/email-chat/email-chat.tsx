import React from "react";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { CapacityError } from "../capacity-error-hint";
import { Help } from "../help/help";
import { EmailChatForm } from "./email-chat-form";
import { EmailChatMessages } from "./email-chat-messages";

export const EmailChat: React.FC = () => {
	const { getFreeChatTokenCapacity, tokenCapacityWarningThreshold } =
		useChatHistoryStore();

	return (
		<div className="flex h-full flex-col items-center justify-between pt-16 pb-5 relative">
			<Help />

			<EmailChatMessages />

			<div>
				{getFreeChatTokenCapacity() > tokenCapacityWarningThreshold && (
					<CapacityError tokenCapacity={0.8}></CapacityError>
				)}
				<EmailChatForm />
			</div>
		</div>
	);
};
