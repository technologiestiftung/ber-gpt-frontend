import React from "react";
import { useCurrentChatIdStore } from "../../../store/current-chat-id-store";
import { IconButton } from "../../buttons/icon-button";
import { BucketIcon } from "../../icons/bucket-icon";
import { useChatHistoryStore } from "../../../store/chat-history-store";

const removeMarkdownStyling = (name: string): string => {
	return name.replace(/[#`>*]/g, "");
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
		<div className="flex items-center justify-start gap-1">
			<button
				className={`h-[30px] w-full truncate rounded-sm px-4 text-start hover:bg-ber-light-grey ${isSelected ? "bg-ber-light-grey" : ""}`}
				onClick={() => setCurrentChatId(id)}
			>
				{removeMarkdownStyling(name)}
			</button>
			<IconButton
				icon={<BucketIcon />}
				onClick={() => deleteChat(id)}
				isOutlineVisible={false}
				ariaLabel="Löschen"
				title="Löschen"
				className="text-ber-light-grey"
			/>
		</div>
	);
};
