import { create } from "zustand";
import { useErrorStore } from "./error-store";
import { persist } from "zustand/middleware";

export interface availableLLM {
	identifier: string;
	baseModelName: string;
	provider: string;
	isGdprCompliant: boolean;
	isOpenSource: boolean;
	description: string;
	serverLocation: string;
}

interface CurrentLLMStore {
	currentLLM: string | undefined;
	setCurrentLLM: (model: string) => void;
	availableLLMs: availableLLM[];
}

const defaultModelIdentifier = "azure-gpt-4o-mini";

export const useCurrentLLMStore = create<CurrentLLMStore>()(
	persist(
		(set) => ({
			currentLLM: undefined,
			setCurrentLLM: (model: string) => set({ currentLLM: model }),
			availableLLMs: [],
		}),
		{ name: "current-llm-store" },
	),
);

getAvailableLLMs().catch(console.error);

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

		const currentLlm = useCurrentLLMStore.getState().currentLLM;
		if (!currentLlm) {
			useCurrentLLMStore.setState({ currentLLM: defaultModel.identifier });
		}
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
