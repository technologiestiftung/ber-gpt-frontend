import React from "react";
import { Layout } from "../layout/layout";
import { Email as EmailUI } from "../components/email/email";

export const Email: React.FC = () => {
	return (
		<Layout>
			<EmailUI />
		</Layout>
	);
};
