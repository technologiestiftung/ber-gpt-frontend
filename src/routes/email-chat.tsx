import React from "react";
import { Layout } from "../layout/layout";
import { EmailChat as EmailChatUI } from "../components/email-chat/email-chat";

export const EmailChat: React.FC = () => {
	return (
		<Layout>
			<EmailChatUI />
		</Layout>
	);
};
