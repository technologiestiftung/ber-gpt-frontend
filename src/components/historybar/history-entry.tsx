import React from "react";
import { useHistoryStore } from "./history-store";

interface HistoryEntryProps {
	name: string;
	id: number;
}

export const HistoryEntry: React.FC<HistoryEntryProps> = ({ name, id }) => {
	const { setCurrentChatID } = useHistoryStore();

	return (
		<button
			className="h-11 w-full rounded border border-transparent bg-light-grey px-4 text-start hover:border-mid-grey active:border-mid-grey active:bg-white"
			onClick={() => setCurrentChatID(id)}
		>
			{name}
		</button>
	);
};
