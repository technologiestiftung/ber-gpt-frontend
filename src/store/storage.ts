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
