import React from "react";
import { ChatIcon } from "./icons/chat-icon";
import { MailIcon } from "./icons/mail-icon";
import { VermerkIcon } from "./icons/vermerk-icon";
import { PDFIcon } from "./icons/pdf-icon";
import { FaqIcon } from "./icons/faq-icon";
import { Faq } from "./faq/faq";

export const Header: React.FC = () => {
	const navLinks = [
		{ label: "Chat Funktion", icon: <ChatIcon />, href: "/" },
		{ label: "E-Mail Funktion", icon: <MailIcon />, href: "/email" },
		{ label: "Vermerk Funktion", icon: <VermerkIcon />, href: "/note" },
		{ label: "Zusammenfassen", icon: <PDFIcon />, href: "/summary" },
	];

	const location = window.location.pathname;

	return (
		<header className="flex items-start gap-4 md:flex-col">
			<div className="flex flex-row items-center justify-between gap-10">
				<img
					className="w-20 md:w-32"
					src="https://logos.citylab-berlin.org/logo-berlin.svg"
					alt={"Berlin Logo"}
				/>
				<nav className="flex w-fit grow pt-1">
					<ul className="hidden h-fit w-full justify-end gap-10 text-[17px] md:flex">
						{navLinks.map((item) => (
							<li
								key={item.label}
								className={`hover:border-darker-grey flex flex-row gap-2 border-transparent hover:border-b-2 hover:font-semibold ${location === item.href ? "font-semibold" : "font-normal"} `}
							>
								{item.icon}
								<a className="text-darker-grey" href={item.href}>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</nav>

				<button
					className="text-dark-blue hover:text-light-blue"
					onClick={() =>
						(
							document.getElementById("faq-dialog") as HTMLDialogElement
						).showModal()
					}
				>
					<FaqIcon />
				</button>
			</div>
			<div className="flex w-fit flex-col items-center md:flex-row md:gap-3">
				<h1 className="text-[22px] font-bold">BärGPT</h1>
				<h2 className="text-[17px]">KI Testumgebung</h2>
			</div>
			<Faq />
		</header>
	);
};
