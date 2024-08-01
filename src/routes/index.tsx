import React from "react";
import { Chat as DefaultChat } from "../components/chat/chat";
import { Layout } from "../layout/layout";

export const Index: React.FC = () => {
	return (
		<Layout>
			<DefaultChat />
		</Layout>
	);
};
