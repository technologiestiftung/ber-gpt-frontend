import React from "react";
import { GetStarted } from "./get-started/get-started";
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
		<div className="flex h-full flex-col items-center justify-between pt-14 py-5">
			{messages.length === 0 && <GetStarted />}

			<ChatMessages />

			<div className="px-5 w-full flex justify-center">
				<div className="md:w-[640px] w-full z-10 flex flex-col rounded-sm bg-light-grey shadow-md">
					<UploadedFiles />

					<ChatForm />
				</div>
			</div>
		</div>
	);
};
