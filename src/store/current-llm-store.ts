import { create } from "zustand";
import { useErrorStore } from "./error-store";

export interface availableLLM {
	identifier: string;
	baseModelName: string;
	provider: string;
	isGdprCompliant: boolean;
}

interface CurrentLLMStore {
	currentLLM: string;
	setCurrentLLM: (model: string) => void;
	availableLLMs: availableLLM[];
}

export const defaultModelIdentifier = "azure-gpt-4o-mini";

export const useCurrentLLMStore = create<CurrentLLMStore>()((set) => {
	getAvailableLLMs().catch(console.error);

	return {
		currentLLM: "",
		setCurrentLLM: (model) => set({ currentLLM: model }),
		availableLLMs: [],
	};
});

async function getAvailableLLMs() {
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

		const { models } = (await response.json()) as { models: availableLLM[] };

		const sortedAvailableLLMs = sortByDefaultModel(models);

		useCurrentLLMStore.setState({ availableLLMs: sortedAvailableLLMs });

		const defaultModel = models.find(
			(model) => model.identifier === defaultModelIdentifier,
		);

		if (!defaultModel) {
			return;
		}

		useCurrentLLMStore.setState({ currentLLM: models[0].identifier });
	} catch (error) {
		handleError(error);
	}
}

function sortByDefaultModel(models: availableLLM[]) {
	const index = models.findIndex(
		(model) => model.identifier === defaultModelIdentifier,
	);
	const itemToMove = models[index];

	if (index === -1) {
		return models;
	}

	models.splice(index, 1);
	models.unshift(itemToMove);

	return models;
}
