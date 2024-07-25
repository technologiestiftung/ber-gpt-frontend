import { create } from "zustand";

interface CurrentChatIdStore {
	currentChatId: string | null;
	setCurrentChatId: (chatId: string | null) => void;
}

export const useCurrentChatIdStore = create<CurrentChatIdStore>()((set) => ({
	currentChatId: null,
	setCurrentChatId: (chat) => set({ currentChatId: chat }),
}));
