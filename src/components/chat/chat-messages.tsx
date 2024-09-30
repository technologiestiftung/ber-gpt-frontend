import React, { useEffect, useRef, useState } from "react";
import { useChatHistoryStore } from "../../store/chat-history-store";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { FileMessage } from "../messages/file-message";
import { TextMessage } from "../messages/text-message";
import { Message } from "../../store/types";
import { useHasUserScrolledStore } from "../../store/has-user-scrolled-store";

export const ChatMessages: React.FC = () => {
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

		const currentScrollTop = messagesContainer.scrollTop;

		/* 
		/ Check for scroll direction to prevent programmatical scrolling being misinterpreted as user scrolling
		/ There is no need to stop auto scrolling to the new message, when user is scrolling down as well.
		*/
		if (lastScrollTop > currentScrollTop) {
			setHasUserScrolled(true);
		}

		setLastScrollTop(currentScrollTop);
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div
			ref={messageContainerRef}
			onScroll={handleScroll}
			className={`flex w-full justify-center overflow-y-auto overflow-x-hidden mb-2 
				${isSafari ? "scroll-auto" : "scroll-smooth"}`}
		>
			<div className="md:w-[640px] lg:w-[768px] w-full h-full flex flex-col gap-y-4 px-5 md:pr-0 md:pl-2 ">
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
