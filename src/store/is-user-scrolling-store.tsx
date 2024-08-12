import { create } from "zustand";

interface IsUserScrollingStore {
	isUserScrolling: boolean;
	setIsUserScrolling: (isUserScrolling: boolean) => void;
}

export const useIsUserScrollingStore = create<IsUserScrollingStore>()(
	(set) => ({
		isUserScrolling: false,
		setIsUserScrolling: (isUserScrolling) => set({ isUserScrolling }),
	}),
);
