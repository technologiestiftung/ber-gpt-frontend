import React from "react";
import { Header } from "../components/header";
import { SplashScreen } from "../components/splash-screen";
import { useSplashStore } from "../store/splash-store";

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { isSplashScreenVisible } = useSplashStore();
	return (
		<div className="flex font-arial">
			<div className="flex h-svh flex-col overflow-hidden p-10 font-arial">
				<Header />

				{children}
			</div>
			{isSplashScreenVisible() && (
				<div className="absolute h-full w-full backdrop-blur-sm">
					<SplashScreen />
				</div>
			)}
		</div>
	);
};
