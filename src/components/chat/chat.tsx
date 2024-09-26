import React, { useMemo } from "react";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { useCurrentLLMStore } from "../../store/current-llm-store";
import { Help } from "../help/help";
import { ErrorIcon } from "../icons/error-icon";
import { UploadedFiles } from "../uploaded-files";
import { ChatForm } from "./chat-form";
import { ChatMessages } from "./chat-messages";
import { GetStarted } from "./get-started/get-started";

export const Chat: React.FC = () => {
	const { getChat, getChatTokenCount } = useChatHistoryStore();
	const { currentChatId } = useCurrentChatIdStore();
	const messages = getChat(currentChatId)?.messages || [];
	const { currentLLM } = useCurrentLLMStore();

	const tokenCount = useMemo(() => {
		const count = getChatTokenCount(messages);
		return count;
	}, [messages]);

	return (
		<div className="flex h-full flex-col items-center justify-between pt-14 py-5 relative">
			<Help />

			{messages.length === 0 && <GetStarted />}

			<ChatMessages />

			{currentLLM && tokenCount > currentLLM.contextSize && (
				<div className="md:w-[640px] lg:w-[768px] w-full flex flex-row gap-4 rounded-sm border-4 border-ber-orange bg-white px-6 py-3 text-[16px] font-semibold text-ber-darker-grey shadow-md mb-4">
					<ErrorIcon />
					<div className="w-full flex justify-center">
						Der Nachrichtenverlauf ist zu lang.
						<a href="/" className="mx-1 underline">
							Bitte starten Sie einen neuen Chat.
						</a>
					</div>
				</div>
			)}

			<div className="px-5 w-full flex justify-center">
				<div className="md:w-[640px] lg:w-[768px] w-full z-10 flex flex-col bg-ber-lighter-grey">
					<UploadedFiles />

					<ChatForm />
				</div>
			</div>
		</div>
	);
};
