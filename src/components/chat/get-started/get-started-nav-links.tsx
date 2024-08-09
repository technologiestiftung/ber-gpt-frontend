import React from "react";
import { ChatIcon } from "../../icons/chat-icon";
import { MailIcon } from "../../icons/mail-icon";
import { VermerkIcon } from "../../icons/vermerk-icon";
import { PDFIcon } from "../../icons/pdf-icon";
import { trackInteraction } from "../../../analytics/matomo";

const appLinks = [
	{
		label: "Stelle Fragen an BärGPT",
		icon: <ChatIcon />,
		href: "/",
		backgroundColor: "bg-ber-green hover:bg-ber-green-darker",
	},
	{
		label: "Formuliere eine E-Mail für mich",
		icon: <MailIcon />,
		href: "/email",
		backgroundColor: "bg-ber-blue hover:bg-ber-blue-darker",
	},
	{
		label: "Hilf mir einen Vermerk zu erstellen",
		icon: <VermerkIcon />,
		href: "/note",
		backgroundColor: "bg-ber-yellow hover:bg-ber-yellow-darker",
	},
	{
		label: "Hilf mir Texte zusammenzufassen",
		icon: <PDFIcon />,
		href: "/summary",
		backgroundColor: "bg-ber-pink hover:bg-ber-pink-darker",
	},
];

export const GetStartedNavLinks: React.FC = () => {
	return (
		<div>
			<nav>
				<ul className="flex flex-row flex-wrap gap-4 justify-center">
					{appLinks.map((item) => (
						<li
							key={item.label}
							className={`flex flex-row w-[304px] gap-3 rounded-sm px-4 py-2.5 hover:underline ${item.backgroundColor} `}
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
