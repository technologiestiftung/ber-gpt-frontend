import React from "react";
import { Chat } from "./chat/chat";
import { HistoryBar } from "./history-bar/history-bar";
import { Email } from "./email/email";

export const Main: React.FC = () => {
	const [showChat, setShowChat] = React.useState(true);

	return (
		<main className="flex flex-1 overflow-hidden py-6">
			<div className="flex w-full">
				<HistoryBar />
				<section className="flex w-full items-center justify-center pl-10">
					{showChat ? <Chat /> : <Email />}
					<button className="bg-red-200" onClick={() => setShowChat(!showChat)}>
						Toggle Chat/Mail
					</button>
				</section>
			</div>
		</main>
	);
};
