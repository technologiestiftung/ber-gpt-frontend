import React from "react";
import { SendIcon } from "../icons/send-icon";
import { PrimaryButton } from "../buttons/primary-button";
import { useIsLoadingStore } from "../../store/is-loading-store";
import { streamChatResponse } from "../../store/api";
import { useChatHistoryStore } from "../../store/chat-history-store";

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

	setIsLoading(false);
}

export const EmailForm: React.FC = () => {
	const { isLoading: isGPTResponseLoading } = useIsLoadingStore();

	const isLoading = isGPTResponseLoading;

	const radioGroups = [
		{
			label: "An wen?",
			name: "recipient",
			options: ["Kolleg:in", "Vorgesetzt:e", "Extern"],
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
			options: ["formell", "informell"],
			defaultChecked: "formell",
		},
	];

	return (
		<form
			className={`flex flex-col gap-4 text-sm text-dark-blue`}
			onSubmit={onSubmit}
		>
			<div className="flex flex-col justify-between gap-6 lg:h-24 lg:flex-row">
				<div className="flex flex-col gap-4 md:flex-row md:gap-10">
					<h1 className="flex py-2 text-[22px] font-bold md:hidden">
						Mailanforderungen
					</h1>
					{radioGroups.map((group) => (
						<div
							className="flex flex-col justify-between gap-1 md:w-fit"
							key={group.name}
						>
							<div className="font-semibold">{group.label}</div>
							<div className="flex flex-row justify-start gap-4 md:flex-col md:gap-2">
								{group.options.map((option) => (
									<div
										className="flex min-w-24 justify-between gap-2"
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
						</div>
					))}
				</div>
				<div className="flex h-full flex-col gap-2 py-2 lg:w-2/5">
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
					className={`flex items-center gap-4 rounded border border-mid-grey px-2 py-2 shadow-md has-[:focus]:border-blue-500 md:border-dark-blue md:shadow-none`}
				>
					<textarea
						className="h-5 max-h-40 min-h-5 w-full resize-y focus:outline-none"
						name="message"
						required
						placeholder="Was soll in der Mail stehen?"
					/>
					<div className="flex self-end">
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
						<button
							className="flex md:hidden"
							disabled={isLoading}
							type="submit"
						>
							<SendIcon className="h-7 w-7 text-dark-blue hover:text-light-blue" />
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};
