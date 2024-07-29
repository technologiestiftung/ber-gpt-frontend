import React, { useMemo, useState } from "react";
import { IconButton } from "../buttons/icon-button";
import { SidebarIcon } from "../icons/sidebar-icon";
import { NewChatIcon } from "../icons/new-chat-icon";
import { subDays } from "date-fns";
import { HistoryGroup } from "./history-group";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";

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
			className={`h-full overflow-y-auto rounded border px-2 pb-6 pt-2 transition-all duration-200 ease-out ${
				isOpen ? "w-72 border-mid-grey" : "w-24 border-transparent"
			}`}
			aria-label="Sidebar"
		>
			<div className={`flex flex-row justify-between gap-2`}>
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
				className={`flex w-auto flex-col gap-5 pl-2 transition-all duration-200 ease-out ${
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
