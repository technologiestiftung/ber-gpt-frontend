import React from "react";
import { Summary as SummaryUI } from "../components/summary/summary";
import { Layout } from "../layout/layout";

export const Summary: React.FC = () => {
	return (
		<Layout>
			<SummaryUI />
		</Layout>
	);
};
