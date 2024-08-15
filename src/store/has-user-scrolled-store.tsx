import { create } from "zustand";

interface IsUserScrollingStore {
	hasUserScrolled: boolean;
	setHasUserScrolled: (hasUserScrolled: boolean) => void;
}

export const useHasUserScrolledStore = create<IsUserScrollingStore>()(
	(set) => ({
		hasUserScrolled: false,
		setHasUserScrolled: (hasUserScrolled) => set({ hasUserScrolled }),
	}),
);
