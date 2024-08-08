import React from "react";
import { SendIcon } from "../icons/send-icon";
import { PrimaryButton } from "../buttons/primary-button";
import { useIsLoadingStore } from "../../store/is-loading-store";
import { streamChatResponse } from "../../store/api";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { XIcon } from "../icons/x-icon";

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

export const EmailForm: React.FC = () => {
	const { isLoading: isGPTResponseLoading } = useIsLoadingStore();
	const [isEmailFormExpanded, setIsEmailFormExpanded] = React.useState(false);

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

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		setIsEmailFormExpanded(false);

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
	};

	return (
		<div
			className={`absolute bottom-0 left-0 z-30 flex w-full flex-col gap-y-4 bg-light-grey px-2.5 pb-4 pt-1 shadow-md md:relative md:top-0 md:gap-y-4 md:rounded-md md:px-6 md:pt-4 md:shadow-md ${isEmailFormExpanded ? "top-[75px] rounded-t-2xl border-x-2 border-t-2 border-mid-grey" : ""}`}
		>
			<div
				className={`flex-row items-center justify-between ${isEmailFormExpanded ? "flex" : "hidden md:flex"}`}
			>
				<h1 className="flex py-2 text-[22px] font-bold text-darker-grey md:hidden">
					Mailanforderungen
				</h1>
				<button
					className="flex md:hidden"
					onClick={() => setIsEmailFormExpanded(false)}
				>
					<XIcon className="h-5 w-5 text-dark-blue hover:text-light-blue" />
				</button>
			</div>
			<form
				className={`flex flex-col justify-between gap-4 text-sm text-dark-blue ${isEmailFormExpanded ? "h-full" : "h-fit"}`}
				onSubmit={onSubmit}
			>
				<div
					className={`flex-col justify-between gap-6 lg:h-24 lg:flex-row ${isEmailFormExpanded ? "flex" : "hidden md:flex"}`}
				>
					<div className="flex flex-col gap-4 md:flex-row md:gap-10">
						{radioGroups.map((group) => (
							<div
								className="flex flex-col items-stretch gap-1 md:w-fit"
								key={group.name}
							>
								<div className="font-semibold">{group.label}</div>
								<div className="flex flex-row justify-start gap-8 md:flex-col md:gap-2">
									{group.options.map((option) => (
										<div className="flex justify-between gap-2" key={option}>
											<label>{option}</label>
											<input
												type="radio"
												name={group.name}
												value={option}
												defaultChecked={group.defaultChecked === option}
												className="h-3 w-3 appearance-none self-center rounded-full bg-white ring-1 ring-dark-blue ring-offset-1 checked:bg-dark-blue"
											/>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
					<div className="flex h-full flex-col gap-2 py-4 md:py-0 lg:w-2/5">
						<label className="font-semibold">Vorherige E-Mail (optional)</label>
						<textarea
							className={`h-20 w-full resize-none rounded border border-mid-grey p-2 focus:border-blue-500 focus:outline-none`}
							name="previousMail"
							placeholder="Mail auf die geantwortet werden soll, hier einfügen..."
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<label
						className={`font-semibold ${isEmailFormExpanded ? "flex" : "hidden md:flex"}`}
					>
						Inhaltliches
					</label>
					<div
						className={`flex items-center gap-4 rounded border border-mid-grey bg-white px-2 py-2 shadow-md has-[:focus]:border-blue-500 md:border-mid-grey md:shadow-none`}
					>
						<textarea
							className={`min-h-5 w-full resize-none focus:outline-none md:h-10 md:max-h-40 md:resize-y ${isEmailFormExpanded ? "h-20" : "h-5"}`}
							name="message"
							required
							placeholder="Was soll in der Mail stehen?"
							onFocus={() => {
								setIsEmailFormExpanded(true);
							}}
							// onBlur={}
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
		</div>
	);
};
