import React from "react";
import { Header } from "./components/header";
import { Main } from "./components/main";
import { Footer } from "./components/footer";

export const App: React.FC = () => {
	return (
		<div className="flex min-h-svh flex-col p-10 font-arial">
			<Header />

			<Main />

			<Footer />
		</div>
	);
};
