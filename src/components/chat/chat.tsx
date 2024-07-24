import React from "react";
import { PrimaryButton } from "../buttons/primary-button";
import { SendIcon } from "../icons/send-icon";
import { GetStarted } from "./get-started";
import { useHistoryStore } from "../historybar/history-store";

interface Message {
	id: string;
	role: string;
	content: string;
}

interface Chat {
	id: string;
	messages: Message[];
}

export const Chat: React.FC = () => {
	const { chatHistory, currentChatID } = useHistoryStore();

	const chatID = chatHistory[currentChatID];

	const [messages, setMessages] = React.useState<Message[]>([]);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const message = formData.get("message");
		if (!message) {
			return;
		}

		setMessages([
			...messages,
			{ id: crypto.randomUUID(), role: "user", content: message as string },
		]);
		e.currentTarget.reset();
	};

	return (
		<div className="flex h-full w-full flex-col justify-between">
			{messages.length === 0 && <GetStarted />}
			<div className="flex flex-col">
				{messages.map(({ id, content }) => (
					<div key={id} className="border p-2">
						{content}
					</div>
				))}
			</div>

			{chatID && chatID.name}
			<form className="flex gap-2 border p-2" onSubmit={onSubmit}>
				<input className="w-full" name="message" type="text" />
				<PrimaryButton
					label={
						<div className="flex flex-row items-center gap-2">
							<SendIcon />
							Senden
						</div>
					}
					ariaLabel="Nachricht abschicken"
					type={"submit"}
				/>
			</form>
		</div>
	);
};
