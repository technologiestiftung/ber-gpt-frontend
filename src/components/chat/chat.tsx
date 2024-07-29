import React from "react";
import { GetStarted } from "./get-started";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import ReactMarkdown from "react-markdown";
import { EmailForm } from "./email-form";
import { ChatForm } from "./chat-form";

export const Chat: React.FC = () => {
	const { getChat } = useChatHistoryStore();
	const { currentChatId } = useCurrentChatIdStore();
	const messages = getChat(currentChatId)?.messages || [];

	return (
		<div className="flex h-full w-full max-w-[1000px] flex-col justify-between">
			{messages.length === 0 && <GetStarted />}

			<div className="shadown-chat flex flex-col gap-y-4 overflow-auto pb-2">
				{messages.map(({ id, content, role }) => (
					<div
						key={id}
						className={`max-w-[60%] rounded border-2 p-4 shadow-md ${role === "user" ? "self-end border-mid-grey" : "self-start border-dark-blue"} `}
					>
						{console.log(typeof content)}
						<ReactMarkdown className="markdown-container">
							{content === "" ? "..." : content}
						</ReactMarkdown>
					</div>
				))}
			</div>

			<div className="shadow-[-10px_0px_20px_10px_rgba(255,255,255,75)]">
				{/* <ChatForm /> */}
				<EmailForm />
			</div>
		</div>
	);
};
