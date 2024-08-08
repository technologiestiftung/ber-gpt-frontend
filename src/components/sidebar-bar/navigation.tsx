import React from "react";
import { ChatIcon } from "../icons/chat-icon";
import { MailIcon } from "../icons/mail-icon";
import { VermerkIcon } from "../icons/vermerk-icon";
import { PDFIcon } from "../icons/pdf-icon";
import { trackInteraction } from "../../analytics/matomo";

const navLinks = [
	{ label: "Chat", icon: <ChatIcon />, href: "/" },
	{ label: "E-Mail formulieren", icon: <MailIcon />, href: "/email" },
	{ label: "Vermerk erstellen", icon: <VermerkIcon />, href: "/note" },
	{ label: "Text Zusammenfassen", icon: <PDFIcon />, href: "/summary" },
];

const location = window.location.pathname;

export const Navigation: React.FC = () => {
	return (
		<div>
			{" "}
			<nav>
				<ul className="flex flex-col px-5 items-start gap-4">
					{navLinks.map((item) => (
						<li
							key={item.label}
							className={`flex flex-row gap-3 hover:font-semibold ${
								location === item.href ? " font-semibold" : "font-normal"
							}`}
						>
							<div className="flex size-4">{item.icon}</div>
							<a
								className="text-darker-grey"
								href={item.href}
								onClick={() =>
									trackInteraction({
										eventAction: "navbar-click",
										eventName: item.label,
									})
								}
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};
