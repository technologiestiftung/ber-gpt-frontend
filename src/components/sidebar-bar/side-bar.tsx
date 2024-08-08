import React, { useMemo, useEffect, useState } from "react";
import { IconButton } from "../buttons/icon-button";
import { SidebarIcon } from "../icons/sidebar-icon";
import { NewChatIcon } from "../icons/new-chat-icon";
import { subDays } from "date-fns";
import { HistoryGroup } from "./history-group/history-group";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { ChatIcon } from "../icons/chat-icon";
import { MailIcon } from "../icons/mail-icon";
import { VermerkIcon } from "../icons/vermerk-icon";
import { PDFIcon } from "../icons/pdf-icon";
import { FaqIcon } from "../icons/faq-icon";

const today = new Date();
const sevenDaysAgo = subDays(today, 7);

const navLinks = [
	{ label: "Chat", icon: <ChatIcon />, href: "/" },
	{ label: "E-Mail formulieren", icon: <MailIcon />, href: "/email" },
	{ label: "Vermerk erstellen", icon: <VermerkIcon />, href: "/note" },
	{ label: "Text Zusammenfassen", icon: <PDFIcon />, href: "/summary" },
];

const location = window.location.pathname;

export const SideBar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(true);

	const { chatHistory } = useChatHistoryStore();
	const { setCurrentChatId, currentChatId } = useCurrentChatIdStore();

	useEffect(() => {
		// close sidebar on mobile when a chat is selected
		if (window.innerWidth < 768) {
			setIsOpen(false);
		}
	}, [currentChatId]);

	const chatsToday = useMemo(
		() =>
			chatHistory.filter(
				(chat) =>
					new Date(chat.timestamp).toDateString() === today.toDateString(),
			),
		[chatHistory, today],
	);

	const chatsLastSevenDays = useMemo(
		() =>
			chatHistory.filter(
				(chat) =>
					new Date(chat.timestamp) >= sevenDaysAgo &&
					!chatsToday.includes(chat),
			),
		[chatHistory, sevenDaysAgo, chatsToday],
	);

	const chatsOlderThanSevenDays = useMemo(
		() =>
			chatHistory.filter(
				(chat) =>
					!chatsLastSevenDays.includes(chat) && !chatsToday.includes(chat),
			),
		[chatHistory, chatsLastSevenDays, chatsToday],
	);

	const chatGroups = useMemo(() => {
		const groups = [];

		if (chatsToday.length > 0) {
			groups.push({ label: "Heute", chats: chatsToday });
		}

		if (chatsLastSevenDays.length > 0) {
			groups.push({ label: "Letzte 7 Tage", chats: chatsLastSevenDays });
		}

		if (chatsOlderThanSevenDays.length > 0) {
			groups.push({
				label: "Älter als 7 Tage",
				chats: chatsOlderThanSevenDays,
			});
		}

		return groups;
	}, [chatsToday, chatsLastSevenDays, chatsOlderThanSevenDays]);

	const toggleIsSidebarOpenLabel = isOpen
		? "Seitenleiste schließen"
		: "Seitenleiste öffnen";

	return (
		<aside
			className={`absolute md:relative flex pt-11 md:pt-0 top-0 flex-col left-0 z-30 justify-between overflow-hidden gap-2 overflow-x-hidden ${
				isOpen
					? "bg-sidebar-grey min-w-72 w-72 h-full pb-4"
					: "min-w-24 w-28 h-fit"
			}`}
			aria-label="Sidebar"
		>
			<div className={`flex justify-between px-5 flex-row gap-2`}>
				<IconButton
					isOutlineVisible={!isOpen}
					icon={<SidebarIcon />}
					ariaLabel={toggleIsSidebarOpenLabel}
					title={toggleIsSidebarOpenLabel}
					onClick={() => setIsOpen(!isOpen)}
				/>
				<IconButton
					isOutlineVisible={!isOpen}
					icon={<NewChatIcon />}
					ariaLabel="Neuen Chat starten"
					title="Neuen Chat starten"
					onClick={() => setCurrentChatId(null)}
				/>
			</div>
			<div
				className={`flex-col px-5 gap-8 pb-8 h-full overflow-y-auto ${isOpen ? "flex" : "hidden"}`}
			>
				<div className={`flex-col text-[22px] ${isOpen ? "flex" : "hidden"}`}>
					<h1 className="font-bold">BärGPT</h1>
					<h2>KI-Testumgebung</h2>
				</div>

				<nav>
					<ul className="flex flex-col items-start gap-3">
						{navLinks.map((item) => (
							<li
								key={item.label}
								className={`flex flex-row gap-3 hover:font-semibold ${
									location === item.href ? " font-semibold" : "font-normal"
								}`}
							>
								<div className="flex size-4">{item.icon}</div>
								<a className="text-darker-grey" href={item.href}>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</nav>

				<div className={`flex flex-col gap-4`}>
					{chatGroups.map(({ label, chats }) => (
						<HistoryGroup key={label} label={label} chats={chats} />
					))}
				</div>

				<div className={`text-sm text-dark-blue`}>
					Der Chat Verlauf wird lokal gespeichert und ist somit nicht für andere
					Personen sichtbar.
				</div>
			</div>
			<button
				className={`px-5 w-fit text-dark-blue hover:text-light-blue ${isOpen ? "flex" : "hidden"}`}
				onClick={() =>
					(
						document.getElementById("faq-dialog") as HTMLDialogElement
					).showModal()
				}
			>
				<FaqIcon className="h-8 w-8" />
			</button>
		</aside>
	);
};
