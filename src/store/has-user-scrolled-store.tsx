import { create } from "zustand";

interface IsUserScrollingStore {
	hasUserScrolled: boolean;
	sethasUserScrolled: (hasUserScrolled: boolean) => void;
}

export const useHasUserScrolledStore = create<IsUserScrollingStore>()(
	(set) => ({
		hasUserScrolled: false,
		sethasUserScrolled: (hasUserScrolled) => set({ hasUserScrolled }),
	}),
);
