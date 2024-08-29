import React from "react";
import { EmailChatForm } from "./email-chat-form";
import { EmailChatMessages } from "./email-chat-messages";
import { Help } from "../help/help";

export const EmailChat: React.FC = () => {
	return (
		<div className="flex h-full flex-col items-center justify-between pt-16 pb-5 relative">
			<Help />

			<EmailChatMessages />

			<EmailChatForm />

			<label className="inline-flex items-center cursor-pointer absolute top-7 md:left-5 right-5">
				<input
					type="checkbox"
					value=""
					checked={true}
					className="sr-only peer"
					onChange={() => {
						window.location.href = "/email";
					}}
				/>
				<div className="relative w-9 h-5 bg-ber-light-grey rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-ber-light-grey after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-ber-darker-grey"></div>
				<span className="ms-2 text-xs font-medium text-ber-darker-grey">
					E-Mail Chat
				</span>
			</label>
		</div>
	);
};
