import { useCurrentChatIdStore } from "./current-chat-id-store";
import { useChatHistoryStore } from "./chat-history-store";
import { File as ExtractedFile } from "./types";
import { useErrorStore } from "./error-store";

export async function streamChatResponse() {
	const chatId = useCurrentChatIdStore.getState().currentChatId;
	const { handleError } = useErrorStore.getState();

	if (!chatId) {
		console.error("No currentChatId found");
		return;
	}

	const previousMessages =
		useChatHistoryStore.getState().getChat(chatId)?.messages || [];

	if (!previousMessages.length) {
		console.error(`No messages found with chatId ${chatId}`);
		return;
	}

	const url = `${import.meta.env.VITE_API_URL}/chat`;

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": import.meta.env.VITE_X_API_KEY,
				llm: "openai",
			},
			body: JSON.stringify({
				messages: previousMessages.map(({ role, content }) => ({
					role,
					content,
				})),
			}),
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

		const messageId = crypto.randomUUID();
		const role = "assistant";
		let allChunks = "";

		useChatHistoryStore.getState().addMessageToChat({
			chatId,
			messageId,
			content: "",
			role,
		});

		const reader = response.body
			.pipeThrough(new TextDecoderStream())
			.getReader();

		// eslint-disable-next-line no-constant-condition
		while (true) {
			const streamChunks = await reader.read();
			if (streamChunks.done) {
				break;
			}

			const stringifiedChunks = streamChunks.value
				.toString()
				.replace(/^data: /gm, "");
			allChunks += stringifiedChunks;

			let content = "";
			for (const chunk of allChunks.split("\n")) {
				try {
					const parsedChunk = JSON.parse(chunk);
					const contentChunk = parsedChunk?.choices?.[0]?.delta?.content;

					// eslint-disable-next-line max-depth
					if (!contentChunk) {
						continue;
					}

					content += contentChunk;
				} catch (error) {
					handleError(error);
				}
			}

			useChatHistoryStore.getState().updateMessageFromChat({
				chatId,
				messageId,
				content,
				role,
			});
			await new Promise((resolve) => setTimeout(resolve, 60));
		}
	} catch (error) {
		handleError(error);
	}
}

export async function extractDocumentContent({
	file,
	id,
}: {
	file: File;
	id: string;
}): Promise<ExtractedFile> {
	const { handleError } = useErrorStore.getState();

	const formdata = new FormData();
	formdata.append("file", file, file.name);

	const url = `${import.meta.env.VITE_API_URL}/documents/extract`;
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"x-api-key": import.meta.env.VITE_X_API_KEY,
				llm: "azure",
			},
			body: formdata,
		});

		await new Promise((resolve) => setTimeout(resolve, 500));

		if (!response.body) {
			console.error("Response body from API is empty");
			handleError(new Error("Response body from API is empty"));
			return { id, name: file.name, content: null, extractionStatus: "error" };
		}

		if (!response.ok) {
			const errorResponse = await response.json();
			handleError(new Error(errorResponse.code));
		}

		const { content } = await response.json();

		const contentWithMetaData = `Datei:${file.name}\nInhalt:\n${content}`;

		return {
			id,
			name: file.name,
			content: contentWithMetaData,
			extractionStatus: "success",
		};
	} catch (error) {
		handleError(error);
		return { id, name: file.name, content: null, extractionStatus: "error" };
	}
}
