import React from "react";
import { ChatIcon } from "./icons/chat-icon";
import { MailIcon } from "./icons/mail-icon";
import { VermerkIcon } from "./icons/vermerk-icon";
import { PDFIcon } from "./icons/pdf-icon";

export const Header: React.FC = () => {
	const navLinks = [
		{ label: "Chat Funktion", icon: <ChatIcon />, href: "/" },
		{ label: "E-Mail Funktion", icon: <MailIcon />, href: "/email" },
		{ label: "Vermerk Funktion", icon: <VermerkIcon />, href: "/note" },
		{ label: "Zusammenfassen", icon: <PDFIcon />, href: "/summary" },
	];

	return (
		<header className="flex flex-col gap-4">
			<div className="flex flex-row justify-between gap-10">
				<img
					className="w-32"
					src="https://logos.citylab-berlin.org/logo-berlin.svg"
					alt={"Berlin Logo"}
				/>
				<nav className="flex w-fit grow pt-1">
					<ul className="flex h-fit w-full justify-end gap-10 text-[17px]">
						{navLinks.map((item) => (
							<li
								key={item.label}
								className="flex flex-row gap-2 border-transparent hover:border-b-2 hover:border-dark-grey hover:font-semibold"
							>
								{item.icon}
								<a className="text-dark-grey" href={item.href}>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
			<div className="flex w-fit flex-row items-center gap-3">
				<h1 className="text-[22px] font-bold">BärGPT</h1>
				<h2 className="text-[17px]">KI Testumgebung</h2>
			</div>
		</header>
	);
};
