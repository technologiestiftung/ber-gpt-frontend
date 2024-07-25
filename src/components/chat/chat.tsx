import React from "react";
import { PrimaryButton } from "../buttons/primary-button";
import { SendIcon } from "../icons/send-icon";
import { GetStarted } from "./get-started";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { UploadIcon } from "../icons/upload-icon";
import { SecondaryButton } from "../buttons/secondary-button";
import { streamChatResponse } from "./api";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { useIsLoadingStore } from "../../store/is-loading-store";

export const Chat: React.FC = () => {
	const { getChat } = useChatHistoryStore();
	const { currentChatId } = useCurrentChatIdStore();
	const { isLoading } = useIsLoadingStore();

	const helperButtons = [
		"E-Mail Hilfe",
		"Vermerk Generieren",
		"Text Zusammenfassen",
	];

	const messages = getChat(currentChatId)?.messages || [];

	return (
		<div className="flex h-full w-full flex-col justify-between">
			{messages.length === 0 && <GetStarted />}

			<div className="flex flex-col gap-y-2">
				{messages.map(({ id, content, role }) => (
					<div
						key={id}
						className={`w-96 rounded border p-2 shadow-lg ${role === "user" ? "self-end" : "self-start border-dark-blue"} `}
					>
						{content === "" ? "..." : content}
					</div>
				))}
			</div>

			<div className="flex flex-col gap-y-6 rounded border border-gray-400 p-8 shadow-lg">
				<form
					className={`flex items-center gap-4 rounded border border-dark-blue px-4 py-2 shadow has-[:focus]:border-blue-500`}
					onSubmit={onSubmit}
				>
					<UploadIcon />
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

				<div className="flex gap-2">
					{helperButtons.map((button) => (
						<SecondaryButton key={button} label={button} />
					))}
				</div>
			</div>
		</div>
	);
};

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

	const chatId = saveMessage(message.toString());

	streamChatResponse(chatId).catch(console.error);

	useIsLoadingStore.getState().setIsLoading(false);
}

function saveMessage(message: string) {
	const { currentChatId } = useCurrentChatIdStore.getState();

	if (!currentChatId) {
		return useChatHistoryStore.getState().createChat(message);
	}

	useChatHistoryStore.getState().addMessageToChat({
		chatId: currentChatId,
		content: message,
		role: "user",
	});

	return currentChatId;
}
