import { create } from "zustand";
import { File } from "./types";
import { extractDocumentContent } from "./api";
import { useCurrentChatIdStore } from "./current-chat-id-store";
import { useChatHistoryStore } from "./chat-history-store";
import { trackInteraction } from "../analytics/matomo";

interface InputFileStore {
	files: File[];
	setFiles: (fileList: FileList | null) => Promise<void>;
	saveFilesAsMessages: () => void;
	saveFileAsMessage: (file: File) => void;
	reset: () => void;
	removeFile: (fileId: string) => void;
}

export const useInputFileStore = create<InputFileStore>()((set, get) => ({
	files: [],

	setFiles: async (fileList: FileList | null) => {
		const files = Array.from(fileList || []);

		const preExtractedFiles = files.map((file) => ({
			name: file.name,
			content: null,
			extractionStatus: "pending",
			id: crypto.randomUUID(),
		})) as File[];

		set({ files: preExtractedFiles });
		trackInteraction({
			eventAction: "file-upload",
			eventName: "file-upload",
		});

		const promises = files.map((file, index) =>
			extractDocumentContent({ file, id: preExtractedFiles[index].id }),
		);

		const extractedFiles = await Promise.all(promises);

		if (extractedFiles.some((result) => result.extractionStatus === "error")) {
			set({ files: [] });
			return;
		}

		set({ files: extractedFiles });
	},

	saveFilesAsMessages() {
		const { files } = useInputFileStore.getState();

		files.forEach((file) => {
			get().saveFileAsMessage(file);
		});
	},

	saveFileAsMessage(file: File) {
		const { currentChatId } = useCurrentChatIdStore.getState();

		const content = file.content ?? "";

		if (!currentChatId) {
			useChatHistoryStore
				.getState()
				.createChat({ fileName: file.name, content });
			return;
		}

		useChatHistoryStore.getState().addMessageToChat({
			chatId: currentChatId,
			fileName: file.name,
			content,
			role: "user",
		});
	},

	reset: () => {
		set({ files: [] });
	},

	removeFile: (fileId: string) => {
		const files = get().files.filter((file) => file.id !== fileId);

		set({ files });
	},
}));
