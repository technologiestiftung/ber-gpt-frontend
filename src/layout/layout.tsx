import React from "react";
import { Header } from "../components/header";
import { Main } from "../components/main";
import { SplashScreen } from "../components/splash-screen";
import { useSplashStore } from "../store/splash-store";
import { useErrorStore } from "../store/error-store";
import { ErrorToast } from "../components/error-toast";

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { isSplashScreenVisible } = useSplashStore();
	const error = useErrorStore().error;

	return (
		<div className="flex justify-center font-arial">
			<div className="flex h-svh flex-col overflow-hidden p-10 font-arial">
				<Header />

				<Main>{children}</Main>
			</div>

			{isSplashScreenVisible() && (
				<div className="absolute h-full w-full backdrop-blur-sm">
					<SplashScreen />
				</div>
			)}

			{error && <ErrorToast error={error} />}
		</div>
	);
};
