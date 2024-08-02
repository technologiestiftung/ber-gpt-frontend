import React from "react";
import { HistoryEntry } from "./history-entry";
import { Chat } from "../../store/types";

interface HistoryGroupProps {
	label: string;
	chats: Chat[];
}

export const HistoryGroup: React.FC<HistoryGroupProps> = ({ label, chats }) => {
	return (
		<div className="flex flex-col gap-2">
			<div key={label} className="font-semibold text-darker-grey">
				{label}
			</div>
			{chats.map((chat) => (
				<HistoryEntry key={chat.id} name={chat.name} id={chat.id} />
			))}
		</div>
	);
};
