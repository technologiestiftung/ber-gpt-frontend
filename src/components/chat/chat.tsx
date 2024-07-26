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
import ReactMarkdown from "react-markdown";

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

			<div className="shadown-chat flex flex-col gap-y-4 overflow-scroll pb-2">
				{messages.map(({ id, content, role }) => (
					<div
						key={id}
						className={`max-w-[60%] rounded border-2 p-4 shadow-md ${role === "user" ? "self-end border-mid-grey" : "self-start border-dark-blue"} `}
					>
						<ReactMarkdown className="markdown-container">
							{content === "" ? "..." : content}
						</ReactMarkdown>
					</div>
				))}
			</div>

			<div className="z-10 flex flex-col gap-y-2 rounded border border-mid-grey px-4 pb-2 pt-4 shadow-[-10px_0px_20px_10px_rgba(255,255,255,75)]">
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
