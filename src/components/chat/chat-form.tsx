import React, { useState } from "react";
import { SendIcon } from "../icons/send-icon.tsx";
import { PrimaryButton } from "../buttons/primary-button.tsx";
import { UploadIcon } from "../icons/upload-icon.tsx";
import { useIsLoadingStore } from "../../store/is-loading-store.ts";
import { SecondaryButton } from "../buttons/secondary-button.tsx";
import { streamChatResponse } from "./api.ts";
import { useChatHistoryStore } from "../../store/chat-history-store";

function onSubmit(e: React.FormEvent<HTMLFormElement>) {
	e.preventDefault();
	useIsLoadingStore.getState().setIsLoading(true);

	const formData = new FormData(e.currentTarget);
	e.currentTarget.reset();

	const message = formData.get("message");
	if (!message) {
		console.error("The input 'message' from the form is missing.");
		useIsLoadingStore.getState().setIsLoading(false);
		return;
	}

	const chatId = useChatHistoryStore.getState().saveMessage(message.toString());

	streamChatResponse(chatId).catch(console.error);

	useIsLoadingStore.getState().setIsLoading(false);
}

export const ChatForm: React.FC = () => {
	const [textInput, setTextInput] = useState("");

	const helperButtons = [
		"E-Mail Hilfe",
		"Vermerk Generieren",
		"Text Zusammenfassen",
	];

	const { isLoading } = useIsLoadingStore();

	return (
		<div className="z-10 flex flex-col gap-y-2 rounded border-2 border-mid-grey bg-white px-6 pb-4 pt-6 shadow-md">
			<form
				className={`flex items-center gap-4 rounded border border-dark-blue px-4 py-2 has-[:focus]:border-blue-500`}
				onSubmit={onSubmit}
			>
				<UploadIcon />
				<textarea
					className="h-5 max-h-40 min-h-5 w-full resize-y text-sm focus:outline-none"
					name="message"
					required
					placeholder="Stelle eine Frage"
					onChange={(e) => setTextInput(e.currentTarget.value)}
				/>
				<div className="flex self-end">
					<PrimaryButton
						label={
							<div className="flex flex-row items-center gap-2">
								<SendIcon />
								Senden
							</div>
						}
						disabled={textInput === "" || isLoading}
						ariaLabel="Nachricht abschicken"
						type={"submit"}
					/>
				</div>
			</form>

			<div className="flex gap-2">
				{helperButtons.map((button) => (
					<SecondaryButton key={button} label={button} />
				))}
			</div>
		</div>
	);
};
