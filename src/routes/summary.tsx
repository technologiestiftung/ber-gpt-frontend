import React from "react";
import { Layout } from "../layout/layout";
import { Chat as DefaultChat } from "../components/chat/chat";

export const Summary: React.FC = () => {
	return (
		<Layout>
			<DefaultChat />
		</Layout>
	);
};
