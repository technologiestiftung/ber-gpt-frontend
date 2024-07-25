import React from "react";
import { ChatIcon } from "./icons/chat-icon";
import { MailIcon } from "./icons/mail-icon";
import { VermerkIcon } from "./icons/vermerk-icon";
import { PDFIcon } from "./icons/pdf-icon";

export const Header: React.FC = () => {
	return (
		<header className="flex flex-col">
			<img
				className="w-32"
				src="https://logos.citylab-berlin.org/logo-berlin.svg"
				alt={"Berlin Logo"}
			/>
			<div className="flex pt-5">
				<div className="w-72">
					<h1 className="text-[22px] font-bold">BärGPT</h1>
					<h2 className="text-[22px]">KI Testumgebung</h2>
				</div>
				<nav className="flex w-full shrink pt-1">
					<ul className="flex h-fit w-full justify-between px-10 text-[17px]">
						{[
							{ label: "Chat Funktion", icon: <ChatIcon /> },
							{ label: "E-Mail Funktion", icon: <MailIcon /> },
							{ label: "Vermerk Funktion", icon: <VermerkIcon /> },
							{ label: "Zusammenfassen", icon: <PDFIcon /> },
						].map((item) => (
							<li
								key={item.label}
								className="flex flex-row gap-2 border-transparent hover:border-b-2 hover:border-dark-grey hover:font-semibold"
							>
								{item.icon}
								<a className="text-dark-grey">{item.label}</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
};
