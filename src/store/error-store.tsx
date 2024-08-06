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

const errorCodes: { [key: string]: string } = {
	failed_to_call_llm: "Fehler beim Aufrufen des LLM.",
	no_file_uploaded: "Es wurde keine Datei hochgeladen.",
	text_extraction_failed:
		"Unerwarteter Fehler beim Extrahieren des Dokumentinhalts.",
	inappropriate_content: "Die Nachricht enthält unangemessene Inhalte.",
	token_rate_limit_exceeded:
		"Token-Rate-Limit überschritten, bitte in einer Minute nochmal versuchen.",
	unauthorized: "Unberechtigt.",
	api_rate_limit_exceeded:
		"API-Rate-Limit überschritten, bitte in einer Minute nochmal versuchen.",
	file_size_limit_exceeded: "Ihre Datei ist zu groß, das Limit beträgt 2 MB",
	unsupported_filetype:
		"Datei-Upload unterstützt nur die folgenden Dateitypen: [pdf]",
	context_length_exceeded:
		"Kontextlänge überschritten, bitte starten Sie einen neuen Chat.",
};

export const useErrorStore = create<ErrorStore>()((set, get) => ({
	error: undefined,

	clearErrors: () => set({ error: undefined }),

	handleError: (response?: errorResponse) => {
		console.error(response);
		set({
			error:
				response && errorCodes[response.code]
					? errorCodes[response.code]
					: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut!",
		});
		setTimeout(get().clearErrors, errorShowTimeMs);
	},
}));
