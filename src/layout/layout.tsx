import React from "react";
import { Header } from "../components/header";
import { Main } from "../components/main";
import { SplashScreenDialog } from "../components/dialogs/splash-screen-dialog";
import { useErrorStore } from "../store/error-store";
import { ErrorToast } from "../components/error-toast";
import { FaqDialog } from "../components/dialogs/faq-dialog/faq-dialog";
import { useIsLockedStore } from "../store/is-locked-store";
import { PasswordDialog } from "../components/dialogs/password-dialog";
import { SettingsDialog } from "../components/dialogs/settings-dialog/settings-dialog";

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	const error = useErrorStore().error;
	const { isLocked } = useIsLockedStore();

	return (
		<div className="flex font-arial">
			{isLocked && <PasswordDialog />}

			{!isLocked && (
				<>
					<div className="flex h-svh w-full flex-col overflow-hidden ">
						<Header />

						<Main>{children}</Main>
					</div>

					<SplashScreenDialog />
					<FaqDialog />
					<SettingsDialog />
				</>
			)}

			{error && <ErrorToast error={error} />}
		</div>
	);
};
