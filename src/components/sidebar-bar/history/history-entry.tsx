import React from "react";
import { useCurrentChatIdStore } from "../../../store/current-chat-id-store";
import { IconButton } from "../../buttons/icon-button";
import { BucketIcon } from "../../icons/bucket-icon";
import { useChatHistoryStore } from "../../../store/chat-history-store";

const removeMarkdownStyling = (name: string): string => {
	return name.replace(/[-#`>*]/g, "");
};

interface HistoryEntryProps {
	name: string;
	id: string;
}

export const HistoryEntry: React.FC<HistoryEntryProps> = ({ name, id }) => {
	const { deleteChat } = useChatHistoryStore();
	const { currentChatId, setCurrentChatId } = useCurrentChatIdStore();

	const isSelected = currentChatId === id;

	return (
		<div className="flex items-center justify-start">
			<button
				className={`h-11 w-9/12 truncate rounded mx-2.5 px-2.5 text-start hover:bg-mid-grey ${isSelected ? "bg-mid-grey" : ""}`}
				onClick={() => setCurrentChatId(id)}
			>
				{removeMarkdownStyling(name)}
			</button>
			<IconButton
				icon={<BucketIcon />}
				onClick={() => deleteChat(id)}
				isOutlineVisible={false}
				className="text-dark-grey"
			/>
		</div>
	);
};