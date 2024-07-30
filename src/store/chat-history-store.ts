import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Chat, Message } from "./types";
import { useCurrentChatIdStore } from "./current-chat-id-store";

interface ChatHistoryStore {
	chatHistory: Chat[];

	getChat: (chatId: string | null) => Chat | undefined;

	createChat: (args: { fileName?: string; content: string }) => string;

	updateChat: (chat: Chat) => void;

	addMessageToChat: (message: {
		chatId: string;
		messageId?: string;
		fileName?: string;
		content: string;
		role: string;
	}) => void;

	updateMessageFromChat: (message: {
		chatId: string;
		messageId: string;
		content: string;
		role: string;
	}) => void;

	saveMessage: (message: string) => void;

	deleteChat: (chatId: string) => void;
}

export const useChatHistoryStore = create(
	persist<ChatHistoryStore>(
		(set, get) => ({
			chatHistory: [],

			getChat: (chatId) => {
				if (!chatId) {
					return undefined;
				}

				return get().chatHistory.find((chat) => chat.id === chatId);
			},

			createChat: ({ fileName, content }) => {
				const newChat = _createChat({ fileName, content });

				set({ chatHistory: [newChat, ...get().chatHistory] });

				useCurrentChatIdStore.getState().setCurrentChatId(newChat.id);

				return newChat.id;
			},

			updateChat: (updatedChat: Chat) => {
				const { chatHistory } = get();

				const updatedChatHistory = chatHistory
					.map((chat) => (chat.id === updatedChat.id ? updatedChat : chat))
					.sort(
						(a, b) =>
							new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
					);

				set({ chatHistory: updatedChatHistory });
			},

			addMessageToChat: ({ chatId, messageId, fileName, content, role }) => {
				const chat = get().chatHistory.find(({ id }) => id === chatId);
				if (!chat) {
					console.error(
						`error: trying to add a message to a non-existing chat (${chatId})`,
					);
					return;
				}

				const updatedChat = _addMessageToChat({
					chat,
					messageId,
					fileName,
					content,
					role,
				});

				get().updateChat(updatedChat);
			},

			updateMessageFromChat({ chatId, messageId, content }) {
				const chat = get().chatHistory.find(({ id }) => id === chatId);
				if (!chat) {
					console.error(
						`error: trying to update a message from a non-existing chat (${chatId})`,
					);
					return;
				}

				const updatedMessages = chat.messages.map((message) =>
					message.id === messageId ? { ...message, content } : message,
				);

				const updatedChat = {
					...chat,
					messages: updatedMessages,
				};

				get().updateChat(updatedChat);
			},

			saveMessage(content: string) {
				const { currentChatId } = useCurrentChatIdStore.getState();

				if (!currentChatId) {
					get().createChat({ content });
					return;
				}

				get().addMessageToChat({
					chatId: currentChatId,
					content,
					role: "user",
				});
			},

			deleteChat: (chatId: string) => {
				const { currentChatId } = useCurrentChatIdStore.getState();

				if (currentChatId === chatId) {
					useCurrentChatIdStore.getState().setCurrentChatId(null);
				}

				const chatHistoryWithoutDeletedChat = get().chatHistory.filter(
					(chat) => chat.id !== chatId,
				);

				set({ chatHistory: chatHistoryWithoutDeletedChat });
			},
		}),
		{
			name: "chat-history",
		},
	),
);

function _createChat({
	fileName,
	content,
}: {
	fileName: string | undefined;
	content: string;
}) {
	const timestamp = new Date().toISOString();

	const chatName = fileName ? fileName.replace(".pdf", "") : content;

	return {
		id: crypto.randomUUID(),
		name: chatName,
		messages: [
			{
				id: crypto.randomUUID(),
				fileName,
				content,
				role: "user",
				type: fileName ? "file" : "text",
				timestamp,
			} as Message,
		],
		timestamp,
	};
}

function _addMessageToChat({
	chat,
	messageId,
	fileName,
	content,
	role,
}: {
	chat: Chat;
	messageId: string | undefined;
	fileName?: string;
	content: string;
	role: string;
}) {
	const timestamp = new Date().toISOString();

	return {
		...chat,
		messages: [
			...chat.messages,
			{
				id: messageId || crypto.randomUUID(),
				fileName,
				content,
				role,
				timestamp,
				type: fileName ? "file" : "text",
			} as Message,
		],
		timestamp,
	};
}
