import React, { useEffect, useRef } from "react";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { Message } from "../../store/types";
import { TextMessage } from "../messages/text-message";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { useHasUserScrolledStore } from "../../store/has-user-scrolled-store";
import { GetStartedEmailChat } from "./get-started-email-chat";

export const EmailChatMessages: React.FC = () => {
	const { getChat } = useChatHistoryStore();
	const { currentChatId } = useCurrentChatIdStore();
	const { setHasUserScrolled } = useHasUserScrolledStore();

	const messages: Message[] = getChat(currentChatId)?.messages || [];

	const messageContainerRef = useRef<null | HTMLDivElement>(null);

	const scrollToBottom = () => {
		const messagesContainer = messageContainerRef.current;

		if (
			messagesContainer &&
			!useHasUserScrolledStore.getState().hasUserScrolled
		) {
			messagesContainer.scrollTo({
				top: messagesContainer.scrollHeight,
				behavior: "smooth",
			});
		}
	};

	const handleScroll = () => {
		const messagesContainer = messageContainerRef.current;

		if (!messagesContainer) {
			return;
		}

		const isScrollPositionCloseToEnd =
			messagesContainer.scrollTop + messagesContainer.clientHeight >=
			messagesContainer.scrollHeight - 10;

		if (isScrollPositionCloseToEnd) {
			setHasUserScrolled(false);
			return;
		}

		setHasUserScrolled(true);
	};

	useEffect(() => {
		const messagesContainer = messageContainerRef.current;

		if (!messagesContainer) {
			return () => {};
		}

		messagesContainer.addEventListener("scroll", handleScroll);

		return () => {
			messagesContainer.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div
			ref={messageContainerRef}
			className="flex w-full justify-center overflow-y-auto overflow-x-hidden pb-2 px-5"
		>
			<div className="md:w-[640px] lg:w-[768px] flex flex-col gap-y-4">
				<div className="flex">
					<GetStartedEmailChat />
				</div>
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
