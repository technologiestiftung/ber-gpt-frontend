import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useErrorStore } from "./error-store";

export interface AvailableLLM {
	identifier: string;
	baseModelName: string;
	provider: string;
	isGdprCompliant: boolean;
	isOpenSource: boolean;
	description: string;
	serverLocation: string;
	contextSize: number;
	status: {
		status: number;
		healthy: boolean;
		welcomeMessage: string | undefined;
		responseTimeMs: number | undefined;
	};
}

interface CurrentLLMStore {
	selectedLLM: AvailableLLM | undefined;
	setSelectedLLM: (llm: AvailableLLM) => void;
	availableLLMs: AvailableLLM[];
	getAvailableLLMs: () => Promise<void>;
}

const defaultModelIdentifier = "azure-gpt-4o-mini";

export const useCurrentLLMStore = create<CurrentLLMStore>()(
	persist(
		(set) => ({
			selectedLLM: undefined,
			setSelectedLLM: (llm: AvailableLLM) => set({ selectedLLM: llm }),
			availableLLMs: [],
			getAvailableLLMs: getAvailableLLMs,
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

		const { models } = (await response.json()) as { models: AvailableLLM[] };

		const sortedAvailableLLMs = sortByDefaultModel(models);

		useCurrentLLMStore.setState({ availableLLMs: sortedAvailableLLMs });

		const defaultModel = models.find(
			(model) => model.identifier === defaultModelIdentifier,
		);

		const selectedLlm = useCurrentLLMStore.getState().selectedLLM;

		if (!selectedLlm) {
			// No selected LLM, use healthy default model
			if (defaultModel && defaultModel.status.healthy) {
				useCurrentLLMStore.setState({ selectedLLM: defaultModel });
				return;
			}

			(
				document.getElementById("settings-dialog") as HTMLDialogElement
			).showModal();
			return;
		}

		if (selectedLlm) {
			const refreshedCurrentLlm = sortedAvailableLLMs.find(
				(llm) => llm.identifier === selectedLlm.identifier,
			);
			if (refreshedCurrentLlm) {
				useCurrentLLMStore.setState({ selectedLLM: refreshedCurrentLlm });
				if (refreshedCurrentLlm.status.healthy) {
					return;
				}
			}
			(
				document.getElementById("settings-dialog") as HTMLDialogElement
			).showModal();
		}
	} catch (error) {
		handleError(error);
	}
}

function sortByDefaultModel(models: AvailableLLM[]) {
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
