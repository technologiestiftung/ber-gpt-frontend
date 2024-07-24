import React, { useEffect, useMemo, useState } from "react";
import { IconButton } from "../buttons/icon-button";
import { SidebarIcon } from "../icons/sidebar-icon";
import { NewChatIcon } from "../icons/new-chat-icon";
import { subDays } from "date-fns";
import { HistoryGroup } from "./history-group";
import { useHistoryStore } from "./history-store";

export const HistoryBar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(true);

	const { chatHistory, setChatHistory } = useHistoryStore();

	const chatHistoryData = [
		{
			id: 0,
			name: "Wie hoch ist der Fernsehturm in Berlin?",
			timestamp: "2024-07-24",
		},
		{
			id: 1,
			name: "Wo befindet sich das Brandenburger Tor?",
			timestamp: "2024-07-22",
		},
		{
			id: 2,
			name: "Welcher Fluss fließt durch Berlin?",
			timestamp: "2024-07-22",
		},
		{
			id: 3,
			name: "Was ist das Wahrzeichen von Berlin?",
			timestamp: "2024-07-07",
		},
		{
			id: 4,
			name: "In welchem Bezirk liegt der Alexanderplatz?",
			timestamp: "2024-06-05",
		},
		{
			id: 5,
			name: "Welches Museum ist auf der Museumsinsel in Berlin?",
			timestamp: "2024-06-01",
		},
	];

	useEffect(() => {
		setChatHistory(chatHistoryData);
		localStorage.removeItem("chat-history");
	}, []);

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
			className={`h-full shrink rounded border px-2 pb-6 pt-2 transition-all duration-200 ease-out ${
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
				className={`flex w-60 flex-col gap-5 px-2 transition-all duration-200 ease-out ${
					isOpen ? "opacity-100" : "opacity-0"
				}`}
			>
				{chatGroups.map(({ label, chats }) => (
					<HistoryGroup key={label} label={label} chats={chats} />
				))}
			</div>
		</aside>
	);
};
