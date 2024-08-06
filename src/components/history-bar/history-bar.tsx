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
	const [isOpen, setIsOpen] = useState(false);

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
			className={`absolute top-[70px] z-30 flex h-fit flex-col justify-start overflow-y-auto overflow-x-hidden rounded transition-all duration-200 ease-out md:relative md:top-0 md:border md:py-2 ${
				isOpen
					? "h-[90%] w-[96%] border-mid-grey bg-white pb-6 md:w-72 md:px-2"
					: "h-fit w-24 border-transparent"
			}`}
			aria-label="Sidebar"
		>
			<div
				className={`flex flex-col justify-between px-0.5 md:flex-row md:gap-2`}
			>
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
				className={`flex w-11/12 flex-col gap-5 transition-all duration-200 ease-in-out md:w-11/12 md:pl-2 ${
					isOpen ? "opacity-100" : "hidden opacity-0"
				}`}
			>
				{chatGroups.map(({ label, chats }) => (
					<HistoryGroup key={label} label={label} chats={chats} />
				))}
			</div>

			<div
				className={`mt-4 w-10/12 text-sm text-dark-blue transition-all ease-in md:w-[200px] md:pl-2 ${
					isOpen ? "opacity-100 duration-300" : "hidden opacity-0 duration-0"
				}`}
			>
				Der Chat Verlauf wird lokal gespeichert und ist somit nicht für andere
				Personen sichtbar.
			</div>
		</aside>
	);
};
