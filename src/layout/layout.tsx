import React from "react";
import { Header } from "../components/header";
import { Main } from "../components/main";
import { SplashScreen } from "../components/splash-screen";
import { useSplashStore } from "../store/splash-store";

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { isSplashScreenVisible } = useSplashStore();

	return (
		<div className="flex justify-center font-arial">
			<div className="flex h-svh w-full flex-col overflow-hidden p-2.5 font-arial md:p-10 2xl:max-w-[1400px]">
				<Header />

				<Main>{children}</Main>
			</div>

			{isSplashScreenVisible() && (
				<div className="absolute h-full w-full backdrop-blur-sm">
					<SplashScreen />
				</div>
			)}
		</div>
	);
};
