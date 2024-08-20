import React, { useEffect } from "react";
import { GetStarted } from "./get-started/get-started";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { UploadedFiles } from "./uploaded-files";
import { ChatForm } from "./chat-form/chat-form";
import { ChatMessages } from "./chat-messages";
import { useCurrentLLMStore } from "../../store/current-llm-store";

export const Chat: React.FC = () => {
	const { getChat } = useChatHistoryStore();
	const { currentChatId } = useCurrentChatIdStore();
	const messages = getChat(currentChatId)?.messages || [];
	const { setCurrentLLM, updateAvailableLLMs, availableLLMs } =
		useCurrentLLMStore();

	useEffect(() => {
		updateAvailableLLMs();
	}, []);

	return (
		<div className="flex h-full flex-col items-center justify-between pt-14 py-5 relative">
			{messages.length === 0 && <GetStarted />}

			<ChatMessages />

			<div className="px-5 w-full flex justify-center">
				<div className="md:w-[640px] lg:w-[768px] w-full z-10 flex flex-col bg-ber-lighter-grey">
					<UploadedFiles />

					<ChatForm />
				</div>
			</div>

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
