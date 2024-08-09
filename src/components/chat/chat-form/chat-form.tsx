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
			className={`flex items-center gap-4 rounded px-4 py-2 has-[:focus]:border-blue-500 md:shadow-none`}
			onSubmit={onSubmit}
		>
			<FileUploadButton />

			<input
				className="w-full bg-lighter-grey focus:outline-none"
				name="message"
				type="text"
				required
				placeholder="Wie kann ich Ihnen helfen?"
			/>
			<PrimaryButton
				className="hidden md:flex"
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
			<button className="flex md:hidden" disabled={isLoading} type="submit">
				<SendIcon className="h-7 w-7 text-dark-blue hover:text-light-blue" />
			</button>
		</form>
	);
};
