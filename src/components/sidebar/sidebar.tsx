import React, { useMemo, useState } from "react";
import { IconButton } from "../buttons/icon-button";
import { SidebarIcon } from "../icons/sidebar-icon";
import { NewChatIcon } from "../icons/new-chat-icon";
import { subDays } from "date-fns";
import { HistoryGroup } from "./history-group";

export const Sidebar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const chatHistory = [
		{
			id: 1,
			name: "Frage 10",
			timestamp: "2024-07-24",
		},
		{
			id: 2,
			name: "Frage 9",
			timestamp: "2024-07-22",
		},
		{
			id: 3,
			name: "Frage 8",
			timestamp: "2024-07-22",
		},
		{
			id: 4,
			name: "Frage 7",
			timestamp: "2024-07-07",
		},
		{
			id: 5,
			name: "Frage 6",
			timestamp: "2024-07-04",
		},
		{
			id: 6,
			name: "Frage 5",
			timestamp: "2024-07-04",
		},
		{
			id: 7,
			name: "Frage 4",
			timestamp: "2024-07-01",
		},
		{
			id: 8,
			name: "Frage 3",
			timestamp: "2024-06-08",
		},
		{
			id: 9,
			name: "Frage 2",
			timestamp: "2024-06-05",
		},
		{
			id: 10,
			name: "Frage 1",
			timestamp: "2024-06-01",
		},
	];

	const today = new Date();
	const sevenDaysAgo = useMemo(() => subDays(today, 7), [today]);

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

	const previousChats = useMemo(
		() =>
			chatHistory.filter(
				(chat) =>
					!chatsLastSevenDays.includes(chat) && !chatsToday.includes(chat),
			),
		[chatHistory, chatsLastSevenDays, chatsToday],
	);

	const chatGroups = useMemo(
		() => [
			{ label: "Heute", chats: chatsToday },
			{ label: "Letzte 7 Tage", chats: chatsLastSevenDays },
			{ label: "Vorherige", chats: previousChats },
		],
		[chatsToday, chatsLastSevenDays, previousChats],
	);

	return (
		<aside
			className={`h-full w-fit shrink rounded border px-2 pb-6 pt-2 transition-all duration-200 ease-out ${
				isOpen ? "w-64 border-light-grey" : "w-24 border-transparent"
			}`}
			aria-label="Sidebar"
		>
			<div className={`flex flex-row justify-between gap-2`}>
				<IconButton
					isOutlineVisible={!isOpen}
					icon={<SidebarIcon />}
					ariaLabel="Seitenleiste anzeigen"
					title="Seitenleiste anzeigen"
					onClick={() => setIsOpen(!isOpen)}
				/>
				<IconButton
					isOutlineVisible={!isOpen}
					icon={<NewChatIcon />}
					ariaLabel="Neuen Chat starten"
					title="Neuen Chat starten"
				/>
			</div>
			<div
				className={`flex w-60 flex-col gap-5 px-2 opacity-100 transition-all duration-200 ease-out ${isOpen ? "opacity-100" : "opacity-0"}`}
			>
				{chatGroups.map(({ label, chats }) => (
					<HistoryGroup key={label} label={label} chats={chats} />
				))}
			</div>
		</aside>
	);
};
