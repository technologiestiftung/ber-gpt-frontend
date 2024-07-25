import { create } from "zustand";

interface IsLoadingStore {
	isLoading: boolean;
	setIsLoading: (isLoading: boolean) => void;
}

export const useIsLoadingStore = create<IsLoadingStore>()((set) => ({
	isLoading: false,
	setIsLoading: (isLoading) => set({ isLoading }),
}));
