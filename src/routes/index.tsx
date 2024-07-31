import React from "react";
import { Chat as DefaultChat } from "../components/chat/chat";
import { Layout } from "../layout/layout";
import { useChatHistoryStore } from "../store/history-stores/chat-history-store";

export const Index: React.FC = () => {
	return (
		<Layout useHistoryStore={useChatHistoryStore}>
			<DefaultChat />
		</Layout>
	);
};
