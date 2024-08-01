import React from "react";
import { FileUploadButton } from "./file-upload-button";
import { PrimaryButton } from "../../buttons/primary-button";
import { SendIcon } from "../../icons/send-icon";
import { useIsLoadingStore } from "../../../store/is-loading-store";
import { useInputFileStore } from "../../../store/input-file-store";
import { useChatHistoryStore } from "../../../store/chat-history-store";
import { streamChatResponse } from "../../../store/api";

const { setIsLoading } = useIsLoadingStore.getState();
const { reset: resetFiles, saveFilesAsMessages } = useInputFileStore.getState();
const { saveMessage } = useChatHistoryStore.getState();

function onSubmit(event: React.FormEvent<HTMLFormElement>) {
	event.preventDefault();
	setIsLoading(true);

	const formData = new FormData(event.currentTarget);
	event.currentTarget.reset();

	const message = formData.get("message");
	if (!message) {
		console.error("The input 'message' from the form is missing.");
		setIsLoading(false);
		return;
	}

	saveFilesAsMessages();
	resetFiles();

	saveMessage(message.toString());

	streamChatResponse().catch(console.error);

	setIsLoading(false);
}

export const ChatForm: React.FC = () => {
	const { isLoading: isGPTResponseLoading } = useIsLoadingStore();
	const { files } = useInputFileStore();

	const isLoading =
		isGPTResponseLoading ||
		files.some(({ extractionStatus }) => extractionStatus === "pending");

	return (
		<form
			className={`flex items-center gap-4 rounded border border-dark-blue px-4 py-2 has-[:focus]:border-blue-500`}
			onSubmit={onSubmit}
		>
			<FileUploadButton />

			<input
				className="w-full focus:outline-none"
				name="message"
				type="text"
				required
				placeholder="Stelle eine Frage"
			/>
			<PrimaryButton
				label={
					<div className="flex flex-row items-center gap-2">
						<SendIcon />
						Senden
					</div>
				}
				disabled={isLoading}
				ariaLabel="Nachricht abschicken"
				type={"submit"}
			/>
		</form>
	);
};
