const storageKeys: Record<string, string> = {
	"/": "chat-history",
	"/email": "email-history",
	"/email-chat": "email-chat-history",
	"/note": "note-history",
	"/edit": "edit-history",
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
	"/email-chat": "E-Mail Chat Funktion",
	"/note": "Vermerk Funktion",
	"/edit": "Zusammenfassung",
};

export function getStorageKeyName(): string {
	const storageKey = storageKeyNames[window.location.pathname];

	if (!storageKey) {
		console.error("No storage key found for", window.location.pathname);
		return "fallback-storage";
	}

	return storageKey;
}
