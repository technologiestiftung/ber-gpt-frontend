import React from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex h-svh flex-col overflow-hidden p-10 font-arial">
			<Header />

			{children}

			<Footer />
		</div>
	);
};
