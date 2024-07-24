import React from "react";

interface HistoryEntryProps {
	name: string;
}

export const HistoryEntry: React.FC<HistoryEntryProps> = ({ name }) => {
	return (
		<button
			className="h-11 w-full rounded border border-transparent bg-light-grey px-4 text-start hover:border-mid-grey active:border-mid-grey active:bg-white"
			onClick={() => {}}
		>
			{name}
		</button>
	);
};
