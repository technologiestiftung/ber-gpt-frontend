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
	status: {
		status: number;
		healthy: boolean;
		welcomeMessage: string | undefined;
		responseTimeMs: number | undefined;
	};
}

interface CurrentLLMStore {
	currentLLM: string;
	setCurrentLLM: (model: string) => void;
	availableLLMs: availableLLM[];
}

const defaultModelIdentifier = "azure-gpt-4o-mini";

export const useCurrentLLMStore = create<CurrentLLMStore>()(
	persist(
		(set) => ({
			currentLLM: "",
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

		const currentLlm = useCurrentLLMStore.getState().currentLLM;
		const currentSelectedLlm = sortedAvailableLLMs.find(
			(model) => model.identifier === currentLlm,
		);

		const firstHealthyLlm = sortedAvailableLLMs.find(
			(model) => model.status.healthy,
		);

		if (currentLlm === "") {
			// No selected LLM, use healthy default model
			if (defaultModel && defaultModel.status.healthy) {
				useCurrentLLMStore.setState({ currentLLM: defaultModel.identifier });
				return;
			}

			// No selected LLM, no healthy default model
			if (firstHealthyLlm) {
				useCurrentLLMStore.setState({
					currentLLM: firstHealthyLlm.identifier,
				});
				handleError(new Error("changed_to_first_healthy_llm"));
				return;
			}

			// No selected LLM, no healthy default model, no healthy model at all
			useCurrentLLMStore.setState({ currentLLM: "" });
			handleError(new Error("no_healthy_llm_available"));
			return;
		}

		if (currentSelectedLlm) {
			if (currentSelectedLlm.status.healthy) {
				return;
			}

			// Selected LLM is not healthy, use healthy default model
			if (defaultModel && defaultModel.status.healthy) {
				useCurrentLLMStore.setState({ currentLLM: defaultModel.identifier });
				handleError(new Error("changed_to_default_llm"));
				return;
			}

			// Selected LLM is not healthy, no healthy default model
			if (firstHealthyLlm) {
				useCurrentLLMStore.setState({
					currentLLM: firstHealthyLlm.identifier,
				});
				handleError(new Error("changed_to_first_healthy_llm"));
				return;
			}

			// No selected LLM, no healthy default model, no healthy model at all
			useCurrentLLMStore.setState({ currentLLM: "" });
			handleError(new Error("no_healthy_llm_available"));
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
