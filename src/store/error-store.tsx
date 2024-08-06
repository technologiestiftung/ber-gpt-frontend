import { create } from "zustand";

interface errorResponse {
	status: number;
	code: string;
	message: string;
}

interface ErrorStore {
	error?: string;
	handleError: (response?: errorResponse) => void;
	clearErrors: () => void;
}

const errorShowTimeMs = 5000;

export const useErrorStore = create<ErrorStore>()((set, get) => ({
	error: undefined,

	clearErrors: () => set({ error: undefined }),

	handleError: (response?: errorResponse) => {
		console.error(response);
		if (response) {
			set({ error: response.code });

			setTimeout(() => {
				get().clearErrors();
			}, errorShowTimeMs);
		} else {
			set({ error: "Ein Fehler ist aufgetreten, versuche es gleich nochmal." });
		}
	},
}));
