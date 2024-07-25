import React from "react";
import { Chat } from "../../store/types";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";

export const HistoryEntry: React.FC<Pick<Chat, "id" | "name">> = ({
	name,
	id,
}) => {
	const { currentChatId, setCurrentChatId } = useCurrentChatIdStore();

	const isSelected = currentChatId === id;

	return (
		<button
			className={`h-11 w-full truncate rounded border bg-light-grey px-4 text-start hover:border-mid-grey ${isSelected ? "border-mid-grey bg-white" : ""}`}
			onClick={() => setCurrentChatId(id)}
		>
			{name}
		</button>
	);
};
