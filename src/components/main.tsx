import React from "react";
import { HistoryBar } from "./history-bar/history-bar";
import { HookType as ChatHistoryStore } from "../store/history-stores/chat-history-store";
import { HookType as EmailChatHistoryStore } from "../store/history-stores/email-history-store";

interface MainProps {
	useHistoryStore: ChatHistoryStore | EmailChatHistoryStore;
	children: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ useHistoryStore, children }) => {
	return (
		<main className="flex flex-1 overflow-hidden py-6">
			<div className="flex w-full">
				<HistoryBar useHistoryStore={useHistoryStore} />
				<section className="flex w-full items-center justify-center pl-10">
					{children}
				</section>
			</div>
		</main>
	);
};
