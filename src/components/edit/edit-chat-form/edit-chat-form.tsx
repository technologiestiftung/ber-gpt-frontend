import React, { useState } from "react";
import { FileUploadButton } from "./file-upload-button";
import { SendIcon } from "../../icons/send-icon";
import { useIsLoadingStore } from "../../../store/is-loading-store";
import { useInputFileStore } from "../../../store/input-file-store";
import { useChatHistoryStore } from "../../../store/chat-history-store";
import { streamChatResponse } from "../../../store/api";
import { useHasUserScrolledStore } from "../../../store/has-user-scrolled-store";

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

export const EditChatForm: React.FC = () => {
	const { isLoading: isGPTResponseLoading } = useIsLoadingStore();
	const [isSendDisabled, setIsSendDisabled] = useState(true);

	const { files } = useInputFileStore();

	const isLoading =
		isGPTResponseLoading ||
		files.some(({ extractionStatus }) => extractionStatus === "pending");

	return (
		<form
			className={`flex flex-col gap-2 p-4 has-[:focus]:border-blue-500`}
			onSubmit={onSubmit}
		>
			<textarea
				className="w-full bg-ber-lighter-grey focus:outline-none h-44 resize-none"
				name="message"
				placeholder="Text hier eingeben"
				required={files.length === 0}
				onInput={(e) => {
					setIsSendDisabled(!e.currentTarget.value);
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter" && !e.shiftKey) {
						e.preventDefault();
						e.currentTarget.form?.dispatchEvent(
							new Event("submit", { bubbles: true }),
						);
					}
				}}
			/>
			<div className="flex flex-row justify-between">
				<FileUploadButton />
				<button
					type="submit"
					disabled={isLoading}
					className={`text-ber-darker-grey hover:text-ber-dark-grey disabled:text-ber-light-grey
						${isSendDisabled && files.length === 0 && "text-ber-light-grey hover:text-ber-light-grey"}`}
				>
					<SendIcon className="w-8 h-8" />
				</button>
			</div>
		</form>
	);
};
