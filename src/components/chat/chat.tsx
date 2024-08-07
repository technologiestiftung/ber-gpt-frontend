import React from "react";
import { GetStarted } from "./get-started";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { UploadedFiles } from "./uploaded-files";
import { ChatForm } from "./chat-form/chat-form";
import { ChatMessages } from "./chat-messages";
import { HelperButtons } from "./helper-buttons";

export const Chat: React.FC = () => {
	const { getChat } = useChatHistoryStore();
	const { currentChatId } = useCurrentChatIdStore();
	const messages = getChat(currentChatId)?.messages || [];

	return (
		<div className="flex h-full w-full flex-col justify-between">
			{messages.length === 0 && <GetStarted />}

			<ChatMessages />

			<div className="shadow-[-10px_0px_20px_10px_rgba(255,255,255,75)]">
				<div className="z-10 flex flex-col gap-y-2 rounded border-mid-grey bg-white px-0.5 pb-4 pt-1 md:gap-y-4 md:border-2 md:px-6 md:pt-6 md:shadow-md">
					<UploadedFiles />

					<ChatForm />

					<HelperButtons />
				</div>
			</div>
		</div>
	);
};
