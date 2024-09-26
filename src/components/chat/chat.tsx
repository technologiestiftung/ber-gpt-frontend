import React, { useMemo } from "react";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { useCurrentLLMStore } from "../../store/current-llm-store";
import { Help } from "../help/help";
import { UploadedFiles } from "../uploaded-files";
import { ChatForm } from "./chat-form";
import { ChatMessages } from "./chat-messages";
import { GetStarted } from "./get-started/get-started";
import { CapacityError } from "../capacity-error-hint";

export const Chat: React.FC = () => {
	const TOKEN_CAPACITY_WARNING_THRESHOLD = 0.8;

	const { getChat, getChatTokenCount } = useChatHistoryStore();
	const { currentChatId } = useCurrentChatIdStore();
	const messages = getChat(currentChatId)?.messages || [];
	const { currentLLM } = useCurrentLLMStore();

	const tokenCapacity = useMemo(() => {
		if (!currentLLM) {
			return 0;
		}
		const count = getChatTokenCount(messages);
		const contextSize = currentLLM.contextSize;
		return count / contextSize;
	}, [messages, currentLLM]);

	return (
		<div className="flex h-full flex-col items-center justify-between pt-14 py-5 relative">
			<Help />

			{messages.length === 0 && <GetStarted />}

			<ChatMessages />

			<div>{tokenCapacity * 100}%</div>

			<div className="px-5 w-full flex flex-col justify-center items-center">
				{tokenCapacity > TOKEN_CAPACITY_WARNING_THRESHOLD && (
					<CapacityError tokenCapacity={tokenCapacity}></CapacityError>
				)}

				<div className="md:w-[640px] lg:w-[768px] w-full z-10 flex flex-col bg-ber-lighter-grey">
					<UploadedFiles />

					<ChatForm isDisabledDueToExceededTokenCapacity={tokenCapacity >= 1} />
				</div>
			</div>
		</div>
	);
};
