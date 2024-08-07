const storageKeys: Record<string, string> = {
	"/": "chat-history",
	"/email": "email-history",
	"/note": "note-history",
	"/summary": "summary-history",
};

export function getStorageKey(): string {
	const storageKey = storageKeys[window.location.pathname];

	if (!storageKey) {
		console.error("No storage key found for", window.location.pathname);
		return "fallback-storage";
	}

	return storageKey;
}

const storageKeyNames: Record<string, string> = {
	"/": "Chat Funktion",
	"/email": "E-Mail Funktion",
	"/note": "Vermerk Funktion",
	"/summary": "Zusammenfassung",
};

export function getStorageKeyName(): string {
	const storageKey = storageKeyNames[window.location.pathname];

	if (!storageKey) {
		console.error("No storage key found for", window.location.pathname);
		return "fallback-storage";
	}

	return storageKey;
}
