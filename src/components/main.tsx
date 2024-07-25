import React from "react";
import { Chat } from "./chat/chat";

export const Main: React.FC = () => {
	return (
		<main className="flex flex-1 py-5">
			<div className="flex w-full">
				<aside className="w-72 border">Placeholder Chat-History</aside>
				<section className="flex w-full items-center justify-center pl-10">
					<Chat />
				</section>
			</div>
		</main>
	);
};
