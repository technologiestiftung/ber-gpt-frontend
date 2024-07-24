import React from "react";
import { useHistoryStore } from "./history-store";

interface HistoryEntryProps {
	name: string;
	id: number;
}

export const HistoryEntry: React.FC<HistoryEntryProps> = ({ name, id }) => {
	const { currentChatID, setCurrentChatID } = useHistoryStore();

	const isSelected = currentChatID === id;

	const truncatedName = name.length > 20 ? name.slice(0, 20) + "..." : name;

	return (
		<button
			className={`h-11 w-full rounded border bg-light-grey px-4 text-start hover:border-mid-grey ${isSelected ? "border-mid-grey bg-white" : ""}`}
			onClick={() => setCurrentChatID(id)}
		>
			{truncatedName}
		</button>
	);
};
