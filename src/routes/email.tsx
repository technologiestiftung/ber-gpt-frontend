import React from "react";
import { Layout } from "../layout/layout";
import { Email as EmailChat } from "../components/email/email";

export const Email: React.FC = () => {
	return (
		<Layout>
			<EmailChat />
		</Layout>
	);
};
