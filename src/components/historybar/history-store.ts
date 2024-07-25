import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Chat {
	id: number;
	name: string;
	timestamp: string;
}

interface HistoryStore {
	chatHistory: Chat[];
	setChatHistory: (history: Chat[]) => void;
	currentChatID: number;
	setCurrentChatID: (chat: number) => void;
}

export const useHistoryStore = create(
	persist<HistoryStore>(
		(set) => ({
			chatHistory: [],
			setChatHistory: (chatHistory: Chat[]) => set({ chatHistory }),
			currentChatID: 0,
			setCurrentChatID: (chat: number) => set({ currentChatID: chat }),
		}),
		{
			name: "chat-history",
		},
	),
);
