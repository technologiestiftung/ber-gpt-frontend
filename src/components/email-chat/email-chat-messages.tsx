import React, { useEffect, useRef, useState } from "react";
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

	const isSafari =
		navigator.userAgent.indexOf("Safari") !== -1 &&
		navigator.userAgent.indexOf("Chrome") === -1;

	const [lastScrollTop, setLastScrollTop] = useState(0);

	const messages: Message[] = getChat(currentChatId)?.messages || [];

	const messageContainerRef = useRef<null | HTMLDivElement>(null);

	const scrollToBottom = () => {
		const messagesContainer = messageContainerRef.current;

		if (
			messagesContainer &&
			!useHasUserScrolledStore.getState().hasUserScrolled
		) {
			messagesContainer.scrollTop =
				messagesContainer.scrollHeight - messagesContainer.clientHeight;
		}
	};

	const handleScroll = () => {
		const messagesContainer = messageContainerRef.current;

		if (!messagesContainer) {
			return;
		}

		const isScrollPositionCloseToEnd =
			messagesContainer.scrollHeight - messagesContainer.clientHeight <=
			messagesContainer.scrollTop + 1;

		if (isScrollPositionCloseToEnd) {
			setHasUserScrolled(false);
			return;
		}

		const scrollTop = messagesContainer.scrollTop;

		/* 
		/ Check for scroll direction to prevent programmatical scrolling being misinterpreted as user scrolling
		/ There is no need to stop auto scrolling to the new message, when user is scrolling down as well.
		*/
		if (lastScrollTop > scrollTop) {
			setHasUserScrolled(true);
		}

		setLastScrollTop(scrollTop);
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div
			ref={messageContainerRef}
			onScroll={handleScroll}
			className={`flex w-full justify-center overflow-y-auto overflow-x-hidden pb-2 px-5 mb-2 
				${isSafari ? "scroll-auto" : "scroll-smooth"}`}
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
