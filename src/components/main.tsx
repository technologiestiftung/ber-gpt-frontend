import React from "react";
import { SideBar } from "./sidebar-bar/side-bar";

interface MainProps {
	children: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ children }) => {
	return (
		<main className="flex flex-1 overflow-hidden">
			<div className="flex w-full flex-col md:flex-row">
				<SideBar />
				<section className="flex items-center justify-center overflow-auto pt-4 md:pl-10 md:pt-0">
					{children}
				</section>
			</div>
		</main>
	);
};
