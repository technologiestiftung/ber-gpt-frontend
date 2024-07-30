import React from "react";
import { SendIcon } from "../icons/send-icon.tsx";
import { PrimaryButton } from "../buttons/primary-button.tsx";
import { useIsLoadingStore } from "../../store/is-loading-store.ts";
import { streamChatResponse } from "../../store/api.ts";
import { useChatHistoryStore } from "../../store/chat-history-store.ts";

const { setIsLoading } = useIsLoadingStore.getState();
const { saveMessage } = useChatHistoryStore.getState();

function createEmailPrompt(formData: FormData) {
	const usePreviousEmail = formData.get("previousMail") !== "";
	const emailPrompt = `**Anforderungen**

Schreibe mit eine E-Mail für eine:n **${formData.get("recipient")}**:

Die E-Mail soll **${formData.get("scope")}** und **${formData.get("formality")}** formuliert sein.

${
	usePreviousEmail
		? `**Gehe dabei auf folgende vorherige E-Mail ein:**

*${formData.get("previousMail")}*`
		: ""
}

**Folgendes sollte in der ${usePreviousEmail ? "Antwort" : ""} Mail beachtet werden:**

${formData.get("message")}`;

	return emailPrompt;
}

function onSubmit(e: React.FormEvent<HTMLFormElement>) {
	e.preventDefault();
	setIsLoading(true);

	const formData = new FormData(e.currentTarget);
	e.currentTarget.reset();

	const emailPromt = createEmailPrompt(formData);

	const message = formData.get("message");
	if (!message) {
		console.error("The input 'message' from the form is missing.");
		setIsLoading(false);
		return;
	}

	saveMessage(emailPromt.toString());

	streamChatResponse().catch(console.error);

	useIsLoadingStore.getState().setIsLoading(false);
}

export const EmailForm: React.FC = () => {
	const { isLoading: isGPTResponseLoading } = useIsLoadingStore();

	const isLoading = isGPTResponseLoading;

	const radioGroups = [
		{
			label: "An wen?",
			name: "recipient",
			options: ["Kolleg:in", "Vorgesetzte:n", "Kund:in"],
			defaultChecked: "Kolleg:in",
		},
		{
			label: "Umfang",
			name: "scope",
			options: ["kurz", "mittel", "lang"],
			defaultChecked: "kurz",
		},
		{
			label: "Formulierung",
			name: "formality",
			options: ["formal", "informal"],
			defaultChecked: "formal",
		},
	];

	return (
		<form
			className={`flex flex-col gap-4 text-sm text-dark-blue`}
			onSubmit={onSubmit}
		>
			<div className="flex h-24 flex-row justify-between gap-4">
				<div className="flex flex-row gap-10">
					{radioGroups.map((group) => (
						<div className="flex w-fit flex-col gap-1" key={group.name}>
							<div className="font-semibold">{group.label}</div>
							{group.options.map((option) => (
								<div
									className="flex flex-row justify-between gap-2"
									key={option}
								>
									<label>{option}</label>
									<input
										type="radio"
										name={group.name}
										value={option}
										defaultChecked={group.defaultChecked === option}
										className="h-3 w-3 appearance-none self-center rounded-full ring-1 ring-dark-blue ring-offset-1 checked:bg-dark-blue"
									/>
								</div>
							))}
						</div>
					))}
				</div>
				<div className="flex h-full w-2/5 flex-col gap-2">
					<label className="font-semibold">Vorherige E-Mail (optional)</label>
					<textarea
						className={`h-full resize-none rounded border border-mid-grey p-2 focus:border-blue-500 focus:outline-none`}
						name="previousMail"
						placeholder="Mail auf die geantwortet werden soll einfügen..."
					/>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<label className="font-semibold">Inhaltliches</label>
				<div
					className={`flex items-center gap-4 rounded border border-dark-blue px-4 py-2 has-[:focus]:border-blue-500`}
				>
					<textarea
						className="h-5 max-h-40 min-h-5 w-full resize-y focus:outline-none"
						name="message"
						required
						placeholder="Beschreibe was inhaltlich in der Mail stehen soll..."
					/>
					<div className="flex self-end">
						<PrimaryButton
							label={
								<div className="flex flex-row items-center gap-2">
									<SendIcon />
									Senden
								</div>
							}
							ariaLabel="Nachricht abschicken"
							type={"submit"}
							disabled={isLoading}
						/>
					</div>
				</div>
			</div>
		</form>
	);
};
