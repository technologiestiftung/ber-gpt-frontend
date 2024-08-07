import React from "react";
import { GetStarted } from "./get-started";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { UploadedFiles } from "./uploaded-files";
import { ChatForm } from "./chat-form/chat-form";
import { ChatMessages } from "./chat-messages";

export const Chat: React.FC = () => {
	const { getChat } = useChatHistoryStore();
	const { currentChatId } = useCurrentChatIdStore();
	const messages = getChat(currentChatId)?.messages || [];

	return (
		<div className="flex h-full w-full flex-col justify-between py-4">
			{messages.length === 0 && <GetStarted />}

			<ChatMessages />

			<div className="z-10 flex flex-col rounded-md bg-white shadow-md">
				<UploadedFiles />

				<ChatForm />
			</div>
		</div>
	);
};
