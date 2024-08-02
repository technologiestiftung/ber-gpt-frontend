import React, { useMemo, useState } from "react";
import { IconButton } from "../buttons/icon-button";
import { SidebarIcon } from "../icons/sidebar-icon";
import { NewChatIcon } from "../icons/new-chat-icon";
import { subDays } from "date-fns";
import { HistoryGroup } from "./history-group";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { useChatHistoryStore } from "../../store/chat-history-store";

const today = new Date();
const sevenDaysAgo = subDays(today, 7);

export const HistoryBar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(true);

	const { chatHistory } = useChatHistoryStore();
	const { setCurrentChatId } = useCurrentChatIdStore();

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
			className={`absolute z-40 flex h-full flex-col justify-start overflow-y-auto rounded px-0.5 pb-6 transition-all duration-200 ease-out md:relative md:border md:px-2 md:pt-2 ${
				isOpen
					? "w-full border-mid-grey bg-white md:w-72"
					: "w-24 border-transparent"
			}`}
			aria-label="Sidebar"
		>
			<div className={`flex flex-col justify-between md:flex-row md:gap-2`}>
				<IconButton
					isOutlineVisible={!isOpen}
					icon={<SidebarIcon />}
					ariaLabel={toggleIsSidebarOpenLabel}
					title={toggleIsSidebarOpenLabel}
					onClick={() => setIsOpen(!isOpen)}
				/>
				<div className={`${isOpen ? "hidden md:flex" : "flex"}`}>
					<IconButton
						isOutlineVisible={!isOpen}
						icon={<NewChatIcon />}
						ariaLabel="Neuen Chat starten"
						title="Neuen Chat starten"
						onClick={() => setCurrentChatId(null)}
					/>
				</div>
			</div>
			<div
				className={`flex w-auto flex-col gap-5 pl-0.5 transition-all duration-200 ease-in-out md:pl-2 ${
					isOpen ? "opacity-100" : "opacity-0"
				}`}
			>
				{chatGroups.map(({ label, chats }) => (
					<HistoryGroup key={label} label={label} chats={chats} />
				))}
			</div>

			<div
				className={`mt-4 w-fit pl-2 text-sm text-dark-blue transition-all ease-in md:w-[200px] ${
					isOpen ? "opacity-100 duration-300" : "opacity-0 duration-0"
				}`}
			>
				Der Chat Verlauf wird lokal gespeichert und ist somit nicht für andere
				Personen sichtbar.
			</div>
		</aside>
	);
};
