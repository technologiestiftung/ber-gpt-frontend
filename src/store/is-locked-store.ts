import { create } from "zustand";
import { persist } from "zustand/middleware";

interface isLockedStore {
	isLocked: boolean;
	unlock: () => void;
}

export const useIsLockedStore = create(
	persist<isLockedStore>(
		(set) => ({
			isLocked: true,
			unlock: () => set({ isLocked: false }),
		}),
		{ name: "is-locked" },
	),
);
