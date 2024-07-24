import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HistoryEntryType {
	id: number;
	name: string;
	timestamp: string;
}

interface HistoryStore {
	chatHistory: HistoryEntryType[];
	setChatHistory: (history: HistoryEntryType[]) => void;
	currentChatID: number;
	setCurrentChatID: (chat: number) => void;
}

export const useHistoryStore = create(
	persist<HistoryStore>(
		(set) => ({
			chatHistory: [],
			setChatHistory: (chatHistory: HistoryEntryType[]) => set({ chatHistory }),
			currentChatID: 0,
			setCurrentChatID: (chat: number) => set({ currentChatID: chat }),
		}),
		{
			name: "chat-history",
		},
	),
);
