import React from "react";
import { FileUploadButton } from "../buttons/file-upload-button";
import { SendIcon } from "../icons/send-icon";
import { useIsLoadingStore } from "../../store/is-loading-store";
import { useInputFileStore } from "../../store/input-file-store";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { streamChatResponse } from "../../store/api";
import { useHasUserScrolledStore } from "../../store/has-user-scrolled-store";

const { setIsLoading } = useIsLoadingStore.getState();
const { reset: resetFiles, saveFilesAsMessages } = useInputFileStore.getState();
const { saveMessage } = useChatHistoryStore.getState();
const { setHasUserScrolled } = useHasUserScrolledStore.getState();

async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
	event.preventDefault();
	setIsLoading(true);
	setHasUserScrolled(false);

	const { files } = useInputFileStore.getState();

	const formData = new FormData(event.currentTarget);
	event.currentTarget.reset();

	const message = formData.get("message");
	if (!message && files.length === 0) {
		console.error("The input 'message' from the form is missing.");
		setIsLoading(false);
		return;
	}

	saveFilesAsMessages();
	resetFiles();

	if (message) {
		saveMessage(message.toString());
	}

	await streamChatResponse().catch(console.error);

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
			className={`flex items-center gap-4 px-6 py-3 has-[:focus]:border-blue-500`}
			onSubmit={onSubmit}
		>
			<FileUploadButton />

			<input
				className="w-full bg-ber-lighter-grey focus:outline-none"
				name="message"
				type="text"
				required={files.length === 0}
				placeholder="Wie kann ich Ihnen helfen?"
			/>

			<button
				type="submit"
				disabled={isLoading}
				className="text-ber-darker-grey hover:text-ber-dark-grey disabled:text-light-grey"
			>
				<SendIcon className="w-8 h-8" />
			</button>
		</form>
	);
};
