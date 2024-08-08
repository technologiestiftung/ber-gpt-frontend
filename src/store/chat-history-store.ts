import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Chat, Message } from "./types";
import { useCurrentChatIdStore } from "./current-chat-id-store";
import { getStorageKey } from "./storage";
import { useErrorStore } from "./error-store";
import { trackInteraction } from "../analytics/matomo";

const STORAGE_KEY = getStorageKey();
const { handleError } = useErrorStore.getState();

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

	removeMessageFromChat: (messageId: string) => void;

	saveMessage: (message: string) => void;

	deleteChat: (chatId: string) => void;

	isLastMessageOfChat: (chatId: string) => boolean;
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

				trackInteraction({
					eventAction: "initiated-conversation",
					eventName: `conversion-initiated-conversation (${STORAGE_KEY.replace("-history", "")})`,
				});

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
					handleError(
						new Error(
							`Trying to add a message to a non-existing chat (${chatId})`,
						),
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
					handleError(
						new Error(
							`Trying to update a message from a non-existing chat (${chatId})`,
						),
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

			removeMessageFromChat: (messageId: string) => {
				const updatedChatHistory = get().chatHistory.map((chat) => {
					const updatedMessages = chat.messages.filter(
						(message) => message.id !== messageId,
					);

					return {
						...chat,
						messages: updatedMessages,
					};
				});

				set({ chatHistory: updatedChatHistory });
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

			isLastMessageOfChat(messageId: string) {
				const { currentChatId } = useCurrentChatIdStore.getState();
				const chat = get().chatHistory.find(({ id }) => id === currentChatId);
				if (!chat) {
					handleError(
						new Error(
							`Trying to delete a message from a non-existing chat (${currentChatId})`,
						),
					);
					return false;
				}

				return chat.messages[chat.messages.length - 1].id === messageId;
			},
		}),

		{
			name: STORAGE_KEY,
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
