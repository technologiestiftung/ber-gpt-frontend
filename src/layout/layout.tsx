import React from "react";
import { Header } from "../components/header";
import { Main } from "../components/main";
import { SplashScreen } from "../components/splash-screen";
import { useSplashStore } from "../store/splash-store";
import { HookType as ChatHistoryStore } from "../store/history-stores/chat-history-store";
import { HookType as EmailChatHistoryStore } from "../store/history-stores/email-history-store";

interface LayoutProps {
	useHistoryStore: ChatHistoryStore | EmailChatHistoryStore;
	children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
	useHistoryStore,
	children,
}) => {
	const { isSplashScreenVisible } = useSplashStore();

	return (
		<div className="flex justify-center font-arial">
			<div className="flex h-svh flex-col overflow-hidden p-10 font-arial">
				<Header />

				<Main useHistoryStore={useHistoryStore}>{children}</Main>
			</div>

			{isSplashScreenVisible() && (
				<div className="absolute h-full w-full backdrop-blur-sm">
					<SplashScreen />
				</div>
			)}
		</div>
	);
};
