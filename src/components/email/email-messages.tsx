import React, { useEffect, useRef } from "react";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { Message } from "../../store/types";
import { TextMessage } from "../messages/text-message";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { useIsUserScrollingStore } from "../../store/is-user-scrolling-store";

export const EmailMessages: React.FC = () => {
	const { getChat } = useChatHistoryStore();
	const { currentChatId } = useCurrentChatIdStore();
	const { isUserScrolling, setIsUserScrolling } = useIsUserScrollingStore();

	const messages: Message[] = getChat(currentChatId)?.messages || [];

	const messageContainerRef = useRef<null | HTMLDivElement>(null);

	const scrollToBottom = () => {
		const messagesContainer = messageContainerRef.current;

		if (messagesContainer) {
			messagesContainer.scrollTo({
				top: messagesContainer.scrollHeight,
				behavior: "smooth",
			});
		}
	};

	useEffect(() => {
		if (!isUserScrolling) {
			scrollToBottom();
		}

		const messagesContainer = messageContainerRef.current;

		if (messagesContainer) {
			messagesContainer.addEventListener(
				"wheel",
				() => setIsUserScrolling(true),
				{
					passive: true,
				},
			);
			messagesContainer.addEventListener(
				"touchmove",
				() => setIsUserScrolling(true),
				{
					passive: true,
				},
			);
		}

		return () => {
			if (messagesContainer) {
				messagesContainer.removeEventListener("wheel", () =>
					setIsUserScrolling(false),
				);
				messagesContainer.removeEventListener("touchmove", () =>
					setIsUserScrolling(false),
				);
			}
		};
	}, [messages]);

	return (
		<div
			ref={messageContainerRef}
			className="flex w-full justify-center overflow-auto pb-2 px-5"
		>
			<div className="md:w-[640px] flex flex-col gap-y-4">
				{messages.map((message) => (
					<TextMessage
						key={message.id}
						role={message.role}
						content={message.content}
						messageId={message.id}
					/>
				))}
			</div>
		</div>
	);
};
