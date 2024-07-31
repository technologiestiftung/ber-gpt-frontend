import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Chat, Message } from "../types";
import { useCurrentChatIdStore } from "../current-chat-id-store";

interface EmailChatHistoryStore {
	chatHistory: Chat[];

	getChat: (chatId: string | null) => Chat | undefined;

	createChat: (content: string) => string;

	updateChat: (chat: Chat) => void;

	addMessageToChat: (message: {
		chatId: string;
		messageId?: string;
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

export const useEmailChatHistoryStore = create(
	persist<EmailChatHistoryStore>(
		(set, get) => ({
			chatHistory: [],

			getChat: (chatId) => {
				if (!chatId) {
					return undefined;
				}

				return get().chatHistory.find((chat) => chat.id === chatId);
			},

			createChat: (content) => {
				const newChat = _createChat(content);

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

			addMessageToChat: ({ chatId, messageId, content, role }) => {
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

				const updatedMessages = chat.messages.map((message: Message) =>
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
					get().createChat(content);
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
			name: "email-history",
		},
	),
);

export type HookType = typeof useEmailChatHistoryStore;

function _createChat(content: string) {
	const timestamp = new Date().toISOString();

	return {
		id: crypto.randomUUID(),
		name: content,
		messages: [
			{
				id: crypto.randomUUID(),
				content,
				role: "user",
				type: "text",
				timestamp,
			} as Message,
		],
		timestamp,
	};
}

function _addMessageToChat({
	chat,
	messageId,
	content,
	role,
}: {
	chat: Chat;
	messageId: string | undefined;
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
				content,
				role,
				timestamp,
				type: "text",
			} as Message,
		],
		timestamp,
	};
}
