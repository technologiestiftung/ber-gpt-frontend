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
		<header className="flex items-start gap-4 md:flex-col md:items-stretch">
			<div className="flex w-full flex-row items-center justify-between md:gap-10">
				<img
					className="w-20 sm:pl-0 md:w-32"
					src="https://logos.citylab-berlin.org/logo-berlin.svg"
					alt={"Berlin Logo"}
				/>
				<nav className="hidden w-fit grow pt-1 md:flex">
					<ul className="flex h-fit w-full justify-end gap-6 md:text-[17px] lg:gap-6">
						{navLinks.map((item) => (
							<li
								key={item.label}
								className={`flex flex-row gap-2 border-transparent hover:border-b-2 hover:border-darker-grey hover:font-semibold ${location === item.href ? "font-semibold" : "font-normal"} `}
							>
								<div className="hidden lg:flex">{item.icon}</div>
								<a className="text-darker-grey" href={item.href}>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</nav>
				<div className="flex w-fit flex-col items-center md:hidden">
					<h1 className="text-[22px] font-bold">BärGPT</h1>
					<h2 className="text-[17px]">KI Testumgebung</h2>
				</div>

				<div className="flex w-20 justify-end">
					<button
						className="hidden text-dark-blue hover:text-light-blue md:flex"
						onClick={() =>
							(
								document.getElementById("faq-dialog") as HTMLDialogElement
							).showModal()
						}
					>
						<FaqIcon />
					</button>
				</div>
			</div>
			<div className="hidden w-fit flex-row items-center gap-3 md:flex">
				<h1 className="text-[22px] font-bold">BärGPT</h1>
				<h2 className="text-[17px]">KI Testumgebung</h2>
			</div>

			<Faq />
		</header>
	);
};
