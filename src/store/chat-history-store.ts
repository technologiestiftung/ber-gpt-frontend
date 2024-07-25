import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Chat } from "./types";
import { useCurrentChatIdStore } from "./current-chat-id-store";

interface ChatHistoryStore {
	chatHistory: Chat[];

	getChat: (chatId: string | null) => Chat | undefined;
	createChat: (firstMessage: string) => string;
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

			createChat: (firstMessage) => {
				const timestamp = new Date().toISOString();

				const newChat = {
					id: crypto.randomUUID(),
					name: firstMessage,
					messages: [
						{
							id: crypto.randomUUID(),
							content: firstMessage,
							role: "user",
							timestamp,
						},
					],
					timestamp,
				};

				set({ chatHistory: [...get().chatHistory, newChat] });

				useCurrentChatIdStore.getState().setCurrentChatId(newChat.id);

				return newChat.id;
			},

			updateChat: (newChat: Chat) =>
				set((state) => ({
					chatHistory: state.chatHistory
						.map((chat) => (chat.id === newChat.id ? newChat : chat))
						.sort(
							(a, b) =>
								new Date(b.timestamp).getTime() -
								new Date(a.timestamp).getTime(),
						),
				})),

			addMessageToChat: ({ chatId, messageId, content, role }) => {
				const timestamp = new Date().toISOString();

				const chat = get().chatHistory.find(({ id }) => id === chatId);
				if (!chat) {
					console.error(
						`error: trying to add a message to a non-existing chat (${chatId})`,
					);
					return;
				}

				const updatedChat = updateChat({
					chat,
					messageId,
					content,
					role,
					timestamp,
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

			deleteChat: (chatId: string) =>
				set((state) => ({
					chatHistory: state.chatHistory.filter((chat) => chat.id !== chatId),
				})),
		}),
		{
			name: "chat-history",
		},
	),
);

function updateChat({
	chat,
	messageId,
	content,
	role,
	timestamp,
}: {
	chat: Chat;
	messageId: string | undefined;
	content: string;
	role: string;
	timestamp: string;
}) {
	return {
		...chat,
		messages: [
			...chat.messages,
			{
				id: messageId || crypto.randomUUID(),
				content,
				role,
				timestamp,
			},
		],
		timestamp,
	};
}
