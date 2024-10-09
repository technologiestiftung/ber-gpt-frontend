import React, {
	useState,
	KeyboardEvent as ReactKeyboardEvent,
	FormEvent as ReactFormEvent,
} from "react";
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

async function onSubmit(event: FormEvent<HTMLFormElement>) {
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
		/**
		 * new lines in the message should be doubled to be displayed correctly in the markdown styled chat
		 */
		const messageWithDoubledNewLines = message
			.toString()
			.replace(/\n/g, "\n\n");
		saveMessage(messageWithDoubledNewLines);
	}

	await streamChatResponse().catch(console.error);

	setIsLoading(false);
}

interface ChatFormProps {
	isDisabledDueToExceededTokenCapacity: boolean;
}

export const ChatForm: React.FC<ChatFormProps> = ({
	isDisabledDueToExceededTokenCapacity,
}) => {
	const { isLoading: isGPTResponseLoading } = useIsLoadingStore();
	const [isSendDisabled, setIsSendDisabled] = useState(true);

	const { files } = useInputFileStore();

	const isLoading =
		isGPTResponseLoading ||
		files.some(({ extractionStatus }) => extractionStatus === "pending");

	const handleEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			e.currentTarget.form?.requestSubmit();
			e.currentTarget.rows = 1;
			return;
		}

		if (e.key === "Enter" && e.shiftKey) {
			e.currentTarget.rows++;
		}
	};

	return (
		<form
			className={`flex items-center gap-4 px-6 py-3 has-[:focus]:border-blue-500`}
			onSubmit={onSubmit}
		>
			<FileUploadButton />

			<textarea
				className="w-full bg-ber-lighter-grey focus:outline-none min-h-6 max-h-44 resize-y"
				name="message"
				onInput={(e) => {
					setIsSendDisabled(!e.currentTarget.value);
				}}
				rows={1}
				required={files.length === 0}
				placeholder="Wie kann ich Ihnen helfen?"
				onKeyDown={handleEnter}
			/>

			<button
				type="submit"
				disabled={isLoading || isDisabledDueToExceededTokenCapacity}
				className={`text-ber-darker-grey hover:text-ber-dark-grey disabled:text-ber-light-grey
					${isDisabledDueToExceededTokenCapacity || (isSendDisabled && files.length === 0 && "text-ber-light-grey hover:text-ber-light-grey")}`}
			>
				<SendIcon className="w-8 h-8" />
			</button>
		</form>
	);
};
