import React from "react";
import { GetStartedMail } from "./get-started-mail";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { EmailForm } from "./email-form";
import { EmailMessages } from "./email-messages";
import { useChatHistoryStore } from "../../store/chat-history-store";

export const Email: React.FC = () => {
	const { getChat } = useChatHistoryStore();
	const { currentChatId } = useCurrentChatIdStore();
	const messages = getChat(currentChatId)?.messages || [];

	return (
		<div className="flex h-full w-full max-w-[1000px] flex-col justify-between">
			{messages.length === 0 && <GetStartedMail />}

			<EmailMessages />

			<div className="shadow-[-10px_0px_20px_10px_rgba(255,255,255,75)]">
				<div className="absolute bottom-0 left-0 z-50 flex h-fit w-full flex-col gap-y-4 border-t-2 border-mid-grey bg-white px-2.5 pb-4 pt-6 shadow-md md:relative md:gap-y-4 md:rounded md:border-2 md:px-6 md:shadow-md">
					<EmailForm />
				</div>
			</div>
		</div>
	);
};
