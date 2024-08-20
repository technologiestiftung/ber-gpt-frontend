import React, { useEffect } from "react";
import { GetStartedMail } from "./get-started-mail";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { EmailForm } from "./email-form/email-form";
import { EmailMessages } from "./email-messages";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { useCurrentLLMStore } from "../../store/current-llm-store";

export const Email: React.FC = () => {
	const { getChat } = useChatHistoryStore();
	const { currentChatId } = useCurrentChatIdStore();
	const messages = getChat(currentChatId)?.messages || [];

	const { setCurrentLLM, updateAvailableLLMs, availableLLMs } =
		useCurrentLLMStore();

	useEffect(() => {
		updateAvailableLLMs();
	}, []);

	return (
		<div className="flex h-full flex-col items-center justify-between pt-16 md:py-5 relative">
			{messages.length === 0 && <GetStartedMail />}

			<EmailMessages />

			<EmailForm />

			<select
				onChange={(e) => setCurrentLLM(e.target.value)}
				className="absolute top-4 left-5 bg-ber-lighter-grey rounded-sm p-1 w-fit h-fit text-sm"
			>
				{availableLLMs.map((model) => (
					<option value={model.identifier} key={model.identifier}>
						{model.provider} ({model.baseModelName}
						{model.isGdprCompliant ? " DSGVO ✓" : " DSGVO 𐄂"})
					</option>
				))}
			</select>
		</div>
	);
};
