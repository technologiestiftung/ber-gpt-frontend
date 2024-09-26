import React, { useMemo } from "react";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { CapacityError } from "../capacity-error-hint";
import { Help } from "../help/help";
import { UploadedFiles } from "../uploaded-files";
import { ChatForm } from "./chat-form";
import { ChatMessages } from "./chat-messages";
import { GetStarted } from "./get-started/get-started";

export const Chat: React.FC = () => {
	const { getChat, getFreeChatTokenCapacity, tokenCapacityWarningThreshold } =
		useChatHistoryStore();
	const { currentChatId } = useCurrentChatIdStore();
	const messages = getChat(currentChatId)?.messages || [];

	const freeChatTokenCapacity = useMemo(() => {
		return getFreeChatTokenCapacity();
	}, [currentChatId]);

	return (
		<div className="flex h-full flex-col items-center justify-between pt-14 py-5 relative">
			<Help />

			{messages.length === 0 && <GetStarted />}

			<ChatMessages />

			<div className="px-5 w-full flex flex-col justify-center items-center">
				{freeChatTokenCapacity > tokenCapacityWarningThreshold && (
					<CapacityError tokenCapacity={freeChatTokenCapacity}></CapacityError>
				)}

				<div className="md:w-[640px] lg:w-[768px] w-full z-10 flex flex-col bg-ber-lighter-grey">
					<UploadedFiles />

					<ChatForm
						isDisabledDueToExceededTokenCapacity={freeChatTokenCapacity >= 1}
					/>
				</div>
			</div>
		</div>
	);
};
