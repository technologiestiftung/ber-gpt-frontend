import React from "react";
import { GetStarted } from "./get-started";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { UploadedFiles } from "./uploaded-files";
import { ChatForm } from "./chat-form/chat-form";
import { ChatMessages } from "./chat-messages/chat-messages";
import { HelperButtons } from "./helper-buttons";

export const Chat: React.FC = () => {
	const { getChat } = useChatHistoryStore();
	const { currentChatId } = useCurrentChatIdStore();
	const messages = getChat(currentChatId)?.messages || [];

	return (
		<div className="flex h-full w-full max-w-[1000px] flex-col justify-between">
			{messages.length === 0 && <GetStarted />}

			<ChatMessages />

			<div className="shadow-[-10px_0px_20px_10px_rgba(255,255,255,75)]">
				<div className="z-10 flex flex-col gap-y-4 rounded border-2 border-mid-grey bg-white px-6 pb-4 pt-6 shadow-md">
					<UploadedFiles />

					<ChatForm />

					<HelperButtons />
				</div>
			</div>
		</div>
	);
};
