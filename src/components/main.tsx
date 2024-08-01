import React from "react";
import { HistoryBar } from "./history-bar/history-bar";

interface MainProps {
	children: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ children }) => {
	return (
		<main className="flex flex-1 overflow-hidden py-6">
			<div className="flex w-full">
				<HistoryBar />
				<section className="flex w-full items-center justify-center pl-10">
					{children}
				</section>
			</div>
		</main>
	);
};
