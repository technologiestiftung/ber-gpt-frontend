import React from "react";
import { ChatIcon } from "../icons/chat-icon";
import { MailIcon } from "../icons/mail-icon";
import { VermerkIcon } from "../icons/vermerk-icon";
import { PDFIcon } from "../icons/pdf-icon";
import { trackInteraction } from "../../analytics/matomo";

const navLinks = [
	{
		label: "Chat",
		icon: <ChatIcon />,
		href: "/",
		backgroundColor: "bg-ber-green hover:bg-ber-green-darker",
	},
	{
		label: "E-Mail formulieren",
		icon: <MailIcon />,
		href: "/email",
		backgroundColor: "bg-ber-blue hover:bg-ber-blue-darker",
	},
	{
		label: "Vermerk erstellen",
		icon: <VermerkIcon />,
		href: "/note",
		backgroundColor: "bg-ber-yellow hover:bg-ber-yellow-darker",
	},
	{
		label: "Text zusammenfassen",
		icon: <PDFIcon />,
		href: "/summary",
		backgroundColor: "bg-ber-pink hover:bg-ber-pink-darker",
	},
];

const location = window.location.pathname;

export const Navigation: React.FC = () => {
	return (
		<div>
			<nav>
				<ul className="flex flex-col px-5 items-start gap-4">
					{navLinks.map((item) => (
						<li key={item.label} className="w-full">
							<a
								className={`text-darker-grey flex-row flex gap-3 w-full rounded-sm px-4 py-2.5 hover:underline ${item.backgroundColor} ${
									location === item.href ? "underline" : "no-underline"
								}`}
								href={item.href}
								onClick={() =>
									trackInteraction({
										eventAction: "navbar-click",
										eventName: item.label,
									})
								}
							>
								<div className="flex size-4">{item.icon}</div>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};
