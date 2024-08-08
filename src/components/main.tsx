import React from "react";
import { SideBar } from "./sidebar-bar/side-bar";

interface MainProps {
	children: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ children }) => {
	return (
		<main className="flex flex-1 overflow-hidden">
			<div className="flex w-full flex-row">
				<SideBar />
				<section className="w-full overflow-hidden">{children}</section>
			</div>
		</main>
	);
};
