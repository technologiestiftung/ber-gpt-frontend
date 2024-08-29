import React, { useState } from "react";
import { SendIcon } from "../../icons/send-icon";
import { useIsLoadingStore } from "../../../store/is-loading-store";
import { streamChatResponse } from "../../../store/api";
import { useChatHistoryStore } from "../../../store/chat-history-store";
import { ChevronUp } from "../../icons/chevron-up";
import { RadioGroups } from "./radio-groups";
import { PreviousEmail } from "./previous-email";
import { useHasUserScrolledStore } from "../../../store/has-user-scrolled-store";

const { setIsLoading } = useIsLoadingStore.getState();
const { saveMessage } = useChatHistoryStore.getState();

function createEmailPrompt(formData: FormData) {
	const hasPreviousMail = formData.get("previousMail") !== "";
	const emailPrompt = `**Anforderungen**

Schreibe mit eine E-Mail für eine:n **${formData.get("recipient")}**:

Die E-Mail soll **${formData.get("scope")}** und **${formData.get("formality")}** formuliert sein.

${
	hasPreviousMail
		? `**Gehe dabei auf folgende vorherige E-Mail ein:**

*${formData.get("previousMail")}*`
		: ""
}

**Folgendes sollte in der ${hasPreviousMail ? "Antwort" : "Mail"} beachtet werden:**

${formData.get("message")}`;

	return emailPrompt;
}

export const EmailForm: React.FC = () => {
	const isDesktop = window.innerWidth > 767;
	const [isEmailFormExpanded, setIsEmailFormExpanded] = useState(isDesktop);
	const { isLoading } = useIsLoadingStore();
	const [isSendDisabled, setIsSendDisabled] = useState(true);
	const { setHasUserScrolled } = useHasUserScrolledStore();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setIsEmailFormExpanded(false);

		e.preventDefault();
		setIsLoading(true);
		setHasUserScrolled(false);

		const formData = new FormData(e.currentTarget);
		e.currentTarget.reset();

		const emailPrompt = createEmailPrompt(formData);

		const message = formData.get("message");
		if (!message) {
			console.error("The input 'message' from the form is missing.");
			setIsLoading(false);
			return;
		}

		saveMessage(emailPrompt.toString());

		await streamChatResponse().catch(console.error);

		setIsLoading(false);
	};

	return (
		<>
			<form
				className="flex w-full justify-center px-5 pb-3 bg-transparent"
				onSubmit={onSubmit}
			>
				<div
					className={`flex flex-col md:max-w-[640px] lg:max-w-[768px] grow bg-transparent ${isEmailFormExpanded && "gap-y-3 sm:gap-y-8"}`}
				>
					<div className="bg-transparent">
						<button
							className="group flex w-full items-center gap-2 pb-2 pt-2 bg-gradient-to-t from-white to-transparent shadow-[0px_0px_20px_20px_rgba(255,255,255,75)]"
							type="button"
							onClick={() => setIsEmailFormExpanded(!isEmailFormExpanded)}
						>
							Mailanforderungen{" "}
							<span
								className={`transition mt-0.5 ${isEmailFormExpanded ? "rotate-180 group-hover:rotate-90" : "rotate-90 group-hover:rotate-180"}`}
							>
								<ChevronUp />
							</span>
						</button>
						{isEmailFormExpanded && (
							<div className="flex flex-col gap-y-3 sm:flex-row sm:gap-x-5">
								<div className="flex flex-col bg-ber-lighter-grey w-full py-6 px-6 gap-y-5">
									<PreviousEmail />
								</div>
								<div className="flex flex-col bg-ber-lighter-grey w-full py-6 px-6 gap-y-5">
									<RadioGroups />
								</div>
							</div>
						)}
					</div>
					<div className="flex items-center w-full bg-ber-lighter-grey py-3 px-6 gap-4">
						<textarea
							className="w-full bg-ber-lighter-grey focus:outline-none max-h-72"
							placeholder="Inhalt der zu generierenden Mail"
							rows={2}
							name="message"
							required
							onInput={(e) => {
								setIsSendDisabled(!e.currentTarget.value);
							}}
							onFocus={() => setIsEmailFormExpanded(true)}
						/>
						<button
							type="submit"
							disabled={isLoading || isSendDisabled}
							className="text-ber-darker-grey hover:text-ber-dark-grey disabled:text-ber-light-grey"
						>
							<SendIcon className="w-8 h-8" />
						</button>
					</div>
				</div>
			</form>
		</>
	);
};
