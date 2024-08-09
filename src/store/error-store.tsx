import { create } from "zustand";

interface ErrorStore {
	error?: string;
	clearErrors: () => void;
	handleError: (error: unknown) => void;
}

const errorShowTimeMs = 5000;

const errorMessages: { [key: string]: string } = {
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
	wrong_password: "Falsches Passwort.",
};

// "Das Streamen der Chatantworten ist fehlgeschlagen."
// "Fehler beim Einfügen der Chatantwort."
// "Response body from API is empty",
// "Extract document content failed"
// "Es wird versucht, eine Nachricht zu einem nicht vorhandenen Chat hinzuzufügen.",
// "Es wird versucht, eine Nachricht aus einem nicht vorhandenen Chat zu aktualisieren.",
// "Es wird versucht, eine Nachricht aus einem nicht vorhandenen Chat zu löschen.",

export const useErrorStore = create<ErrorStore>()((set, get) => ({
	error: undefined,

	clearErrors: () => set({ error: undefined }),

	handleError: (error) => {
		if (!isError(error)) {
			console.error("Given error object is not an instance of Error:", error);
			return;
		}

		console.error(error);

		const userReadableErrorMessage = errorMessages[error.message];

		if (!userReadableErrorMessage) {
			return;
		}

		set({ error: userReadableErrorMessage });
		setTimeout(get().clearErrors, errorShowTimeMs);
	},
}));

function isError(error: unknown): error is Error {
	return error instanceof Error;
}
