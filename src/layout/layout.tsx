import React from "react";
import { Header } from "../components/header";
import { Main } from "../components/main";
import { SplashScreen } from "../components/splash-screen";
import { useSplashStore } from "../store/splash-store";
import { useErrorStore } from "../store/error-store";
import { ErrorToast } from "../components/error-toast";
import { Faq } from "../components/faq/faq";

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { isSplashScreenVisible } = useSplashStore();
	const error = useErrorStore().error;

	return (
		<div className="flex font-arial">
			<div className="flex h-svh w-full flex-col overflow-hidden ">
				<Header />

				<Main>{children}</Main>
			</div>

			{isSplashScreenVisible() && (
				<div className="absolute z-50 h-full w-full backdrop-blur-sm">
					<SplashScreen />
				</div>
			)}

			<Faq />

			{error && <ErrorToast error={error} />}
		</div>
	);
};
