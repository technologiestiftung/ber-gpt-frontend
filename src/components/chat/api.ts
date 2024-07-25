import { useChatHistoryStore } from "../../store/chat-history-store";
import { Message } from "../../store/types";

export async function streamChatResponse(chatId: string) {
	const previousMessages: Message[] =
		useChatHistoryStore.getState().getChat(chatId)?.messages || [];

	if (!previousMessages.length) {
		console.error(`No messages found with chatId ${chatId}`);
		return;
	}

	try {
		const response = await fetch(import.meta.env.VITE_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": import.meta.env.VITE_X_API_KEY,
				llm: "azure",
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

		const messageId = crypto.randomUUID();
		const role = "assistant";
		let content = "";

		useChatHistoryStore.getState().addMessageToChat({
			chatId,
			messageId,
			content,
			role,
		});

		const reader = response.body
			.pipeThrough(new TextDecoderStream())
			.getReader();

		while (reader) {
			const stream = await reader.read();
			if (stream.done) {
				break;
			}

			const chunks = stream.value
				.toString()
				.replace(/^data: /gm, "")
				.split("\n")
				.filter((c: string) => Boolean(c.length) && c !== "[DONE]")
				.map((c: string) => JSON.parse(c));

			if (!chunks) {
				continue;
			}

			for (const chunk of chunks) {
				const contentChunk = chunk.choices[0].delta.content;

				if (!contentChunk) {
					continue;
				}

				content += contentChunk;

				useChatHistoryStore
					.getState()
					.updateMessageFromChat({ chatId, messageId, content, role });

				await new Promise((resolve) => setTimeout(resolve, 100));
			}
		}
	} catch (error) {
		console.error(error);
	}
}
