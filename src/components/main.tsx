import React from "react";
import { HistoryBar } from "./history-bar/history-bar";
import { getStorageKeyName } from "../store/storage";

interface MainProps {
	children: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ children }) => {
	return (
		<main className="flex flex-1 overflow-hidden py-6">
			<div className="relative flex w-full flex-col md:flex-row">
				<HistoryBar />

				<div className="z-50 w-fit self-center pt-2 text-[22px] md:hidden">
					{getStorageKeyName()}
				</div>
				<section className="flex w-full items-center justify-center pt-12 md:pl-10">
					{children}
				</section>
			</div>
		</main>
	);
};
