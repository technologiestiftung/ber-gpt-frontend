import { create } from "zustand";
import { useErrorStore } from "./error-store";

interface availableLLM {
	identifier: string;
	baseModelName: string;
	provider: string;
	isGdprCompliant: boolean;
}

interface CurrentLLMStore {
	currentLLM: string;
	setCurrentLLM: (model: string) => void;
	updateAvailableLLMs: () => Promise<void>;
	availableLLMs: availableLLM[];
}

export const useCurrentLLMStore = create<CurrentLLMStore>()((set) => ({
	currentLLM: "",
	setCurrentLLM: (model) => set({ currentLLM: model }),
	availableLLMs: [],
	updateAvailableLLMs: async () => {
		const { handleError } = useErrorStore.getState();
		const url = `${import.meta.env.VITE_API_URL}/models`;

		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"x-api-key": import.meta.env.VITE_X_API_KEY,
				},
			});

			if (!response.body) {
				console.error("Response body from API is empty");
				return;
			}

			if (!response.ok) {
				const errorResponse = await response.json();
				handleError(new Error(errorResponse.code));
				return;
			}

			const { models } = await response.json();
			set({ currentLLM: models[0].identifier });
			set({ availableLLMs: models });
		} catch (error) {
			handleError(error);
		}
	},
}));
