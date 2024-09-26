import React from "react";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { CapacityError } from "../capacity-error-hint";
import { Help } from "../help/help";
import { UploadedFiles } from "../uploaded-files";
import { EditChatForm } from "./edit-chat-form";
import { EditChatMessages } from "./edit-chat-messages";

export const Edit: React.FC = () => {
	const { getFreeChatTokenCapacity, tokenCapacityWarningThreshold } =
		useChatHistoryStore();
	const freeChatTokenCapacity = getFreeChatTokenCapacity();

	return (
		<div className="flex h-full flex-col items-center justify-between pt-14 py-5 relative">
			<Help />

			<EditChatMessages />

			<div className="px-5 w-full flex flex-col justify-center items-center">
				{freeChatTokenCapacity > tokenCapacityWarningThreshold && (
					<CapacityError tokenCapacity={freeChatTokenCapacity}></CapacityError>
				)}

				<div className="md:w-[640px] lg:w-[768px] w-full z-10 flex flex-col bg-ber-lighter-grey">
					<UploadedFiles />

					<EditChatForm />
				</div>
			</div>
		</div>
	);
};
