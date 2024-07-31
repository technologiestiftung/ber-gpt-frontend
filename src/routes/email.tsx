import React from "react";
import { Layout } from "../layout/layout";
import { useEmailChatHistoryStore } from "../store/history-stores/email-history-store";
import { Email as EmailChat } from "../components/email/email";

export const Email: React.FC = () => {
	return (
		<Layout useHistoryStore={useEmailChatHistoryStore}>
			<EmailChat />
		</Layout>
	);
};
