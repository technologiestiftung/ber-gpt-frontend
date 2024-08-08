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
		<div className="flex items-center justify-between gap-2">
			<button
				className={`h-11 w-5/6 truncate rounded border bg-light-grey px-4 text-start hover:border-mid-grey ${isSelected ? "border-mid-grey bg-white" : ""}`}
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
