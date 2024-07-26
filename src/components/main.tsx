import React from "react";
import { Chat } from "./chat/chat";
import { HistoryBar } from "./history-bar/history-bar";

export const Main: React.FC = () => {
	return (
		<main className="flex flex-1 overflow-hidden py-4">
			<div className="flex w-full">
				<HistoryBar />
				<section className="flex w-full items-center justify-center pl-10">
					<Chat />
				</section>
			</div>
		</main>
	);
};
