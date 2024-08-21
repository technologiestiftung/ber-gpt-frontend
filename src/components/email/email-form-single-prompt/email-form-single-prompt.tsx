import React from "react";
import { SendIcon } from "../../icons/send-icon";
import { useIsLoadingStore } from "../../../store/is-loading-store";
import { streamChatResponse } from "../../../store/api";
import { useChatHistoryStore } from "../../../store/chat-history-store";
import { useHasUserScrolledStore } from "../../../store/has-user-scrolled-store";

const { setIsLoading } = useIsLoadingStore.getState();
const { saveMessage } = useChatHistoryStore.getState();

export const EmailFormSinglePrompt: React.FC = () => {
	const { isLoading } = useIsLoadingStore();
	const { setHasUserScrolled } = useHasUserScrolledStore();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setHasUserScrolled(false);

		const formData = new FormData(e.currentTarget);
		e.currentTarget.reset();

		const message = formData.get("message");
		if (!message) {
			console.error("The input 'message' from the form is missing.");
			setIsLoading(false);
			return;
		}

		console.log("saveMessage", message.toString());

		saveMessage(message.toString());

		await streamChatResponse().catch(console.error);

		setIsLoading(false);
	};

	return (
		<>
			<div className="px-5 w-full flex justify-center">
				<div className="md:w-[640px] lg:w-[768px] w-full z-10 flex flex-col bg-ber-lighter-grey">
					<form
						className={`flex items-center gap-4 px-6 py-3 has-[:focus]:border-blue-500`}
						onSubmit={onSubmit}
					>
						<input
							className="w-full bg-ber-lighter-grey focus:outline-none"
							name="message"
							type="text"
							required
							placeholder="Was für eine E-Mail möchten Sie formulieren?"
						/>

						<button
							type="submit"
							disabled={isLoading}
							className="text-ber-darker-grey hover:text-ber-dark-grey disabled:text-light-grey"
						>
							<SendIcon className="w-8 h-8" />
						</button>
					</form>
				</div>
			</div>
		</>
	);
};
