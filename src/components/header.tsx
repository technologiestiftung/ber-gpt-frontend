import React, { useState } from "react";
import { ChatIcon } from "./icons/chat-icon";
import { MailIcon } from "./icons/mail-icon";
import { VermerkIcon } from "./icons/vermerk-icon";
import { PDFIcon } from "./icons/pdf-icon";
import { FaqIcon } from "./icons/faq-icon";
import { Faq } from "./faq/faq";
import { getStorageKeyName } from "../store/storage";
import { MenuIcon } from "./icons/menu-icon";
import { ArrowBackIcon } from "./icons/arrow-back-icon";

export const Header: React.FC = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navLinks = [
		{ label: "Chat", icon: <ChatIcon />, href: "/" },
		{ label: "E-Mail formulieren", icon: <MailIcon />, href: "/email" },
		{ label: "Vermerk erstellen", icon: <VermerkIcon />, href: "/note" },
		{ label: "Text Zusammenfassen", icon: <PDFIcon />, href: "/summary" },
	];

	const location = window.location.pathname;

	return (
		<header className="flex flex-col items-start md:items-stretch md:gap-4">
			<div className="flex w-full flex-row items-center justify-between md:gap-10">
				<img
					className="w-20 sm:pl-0 md:w-32"
					src="https://logos.citylab-berlin.org/logo-berlin.svg"
					alt="Berlin Logo"
				/>
				<nav className="hidden w-fit grow pt-1 md:flex">
					<ul className="flex h-fit w-full justify-end gap-6 md:text-[17px] lg:gap-6">
						{navLinks.map((item) => (
							<li
								key={item.label}
								className={`flex flex-row gap-2 hover:border-b-2 hover:border-darker-grey ${
									location === item.href
										? "border-b-2 border-darker-grey font-semibold"
										: "border-transparent font-normal"
								}`}
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
					<h2 className="text-[17px]">KI-Testumgebung</h2>
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
				<h2 className="text-[17px]">KI-Testumgebung</h2>
			</div>
			<div className="flex w-full flex-row justify-between pt-2 md:hidden">
				<div className="w-9" />
				<div className="w-fit text-[22px]">{getStorageKeyName()}</div>
				<div>
					<button
						className="w-9 p-1 text-dark-blue"
						onClick={() => setIsMobileMenuOpen(true)}
					>
						<MenuIcon />
					</button>
					<div
						className={`absolute left-0 top-[70px] z-40 h-[90%] w-full bg-white ${
							isMobileMenuOpen ? "" : "hidden"
						}`}
					>
						<div className="flex flex-row justify-start gap-6 px-2.5 pt-6">
							<button
								className="text-dark-blue"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								<ArrowBackIcon />
							</button>
							<h1 className="text-[22px] text-darker-grey">
								Funktionsübersicht
							</h1>
						</div>
						<nav className="md:hiddens flex w-full items-center justify-center pt-1">
							<ul className="flex h-fit w-64 flex-col items-start gap-10 pt-16">
								{navLinks.map((item) => (
									<li
										key={item.label}
										className={`flex flex-row items-center gap-6 hover:border-b-2 hover:border-darker-grey ${
											location === item.href
												? "border-b-2 border-darker-grey font-semibold"
												: "border-transparent font-normal"
										}`}
									>
										<div className="flex">{item.icon}</div>
										<a
											className="text-[22px] text-darker-grey"
											href={item.href}
										>
											{item.label}
										</a>
									</li>
								))}
								<li>
									<button
										className="flex items-center gap-5 text-dark-blue hover:text-light-blue"
										onClick={() =>
											(
												document.getElementById(
													"faq-dialog",
												) as HTMLDialogElement
											).showModal()
										}
									>
										<FaqIcon className="h-6 w-6" />

										<h1 className="text-[22px] text-darker-grey">F.A.Q.</h1>
									</button>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>

			<Faq />
		</header>
	);
};
