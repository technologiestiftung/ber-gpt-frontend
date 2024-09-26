import React, { useState } from "react";
import { SendIcon } from "../icons/send-icon";
import { useIsLoadingStore } from "../../store/is-loading-store";
import { streamChatResponse } from "../../store/api";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { useHasUserScrolledStore } from "../../store/has-user-scrolled-store";
import { CapacityError } from "../capacity-error-hint";

const { setIsLoading } = useIsLoadingStore.getState();
const { saveMessage } = useChatHistoryStore.getState();

export const EmailChatForm: React.FC = () => {
	const { isLoading } = useIsLoadingStore();
	const { setHasUserScrolled } = useHasUserScrolledStore();

	const [isSendDisabled, setIsSendDisabled] = useState(true);

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

		saveMessage(message.toString());

		await streamChatResponse().catch(console.error);

		setIsLoading(false);
	};

	return (
		<>
			<div className="px-5 w-full flex justify-center">
				<div className="md:w-[640px] lg:w-[768px] w-full z-10 flex flex-col bg-ber-lighter-grey">
					<form
						className={`flex flex-col items-end gap-2 p-4 has-[:focus]:border-blue-500`}
						onSubmit={onSubmit}
					>
						<textarea
							className="w-full bg-ber-lighter-grey focus:outline-none h-44 resize-none"
							name="message"
							required
							placeholder="Text hier eingeben"
							onInput={(e) => {
								setIsSendDisabled(!e.currentTarget.value);
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									e.currentTarget.form?.requestSubmit();
								}
							}}
						/>

						<button
							type="submit"
							disabled={isLoading}
							className={`text-ber-darker-grey hover:text-ber-dark-grey disabled:text-ber-light-grey
								${isSendDisabled && "text-ber-light-grey hover:text-ber-light-grey"}`}
						>
							<SendIcon className="w-8 h-8" />
						</button>
					</form>
				</div>
			</div>
		</>
	);
};
