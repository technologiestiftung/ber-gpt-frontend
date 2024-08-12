import React, { useEffect, useRef } from "react";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { FileMessage } from "../messages/file-message";
import { TextMessage } from "../messages/text-message";
import { Message } from "../../store/types";
import { useIsUserScrollingStore } from "../../store/is-user-scrolling-store";

export const ChatMessages: React.FC = () => {
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
			className="flex w-full justify-center overflow-auto scroll-smooth mb-2"
		>
			<div className="md:w-[640px] w-full h-full flex flex-col gap-y-4 px-5">
				{messages.map((message) => (
					<React.Fragment key={message.id}>
						{message.type === "file" && (
							<FileMessage fileName={message.fileName} />
						)}

						{message.type === "text" && (
							<TextMessage
								role={message.role}
								content={message.content}
								messageId={message.id}
							/>
						)}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};
