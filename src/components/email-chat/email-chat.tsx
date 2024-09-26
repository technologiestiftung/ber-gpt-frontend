import React, { useMemo } from "react";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { CapacityError } from "../capacity-error-hint";
import { Help } from "../help/help";
import { EmailChatForm } from "./email-chat-form";
import { EmailChatMessages } from "./email-chat-messages";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";

export const EmailChat: React.FC = () => {
	const { currentChatId } = useCurrentChatIdStore();

	const { getFreeChatTokenCapacity, tokenCapacityWarningThreshold } =
		useChatHistoryStore();

	const freeChatTokenCapacity = useMemo(() => {
		return getFreeChatTokenCapacity();
	}, [currentChatId]);

	return (
		<div className="flex h-full flex-col items-center justify-between pt-16 pb-5 relative">
			<Help />

			<EmailChatMessages />

			<div>
				{freeChatTokenCapacity > tokenCapacityWarningThreshold && (
					<CapacityError tokenCapacity={0.8}></CapacityError>
				)}
				<EmailChatForm />
			</div>
		</div>
	);
};
