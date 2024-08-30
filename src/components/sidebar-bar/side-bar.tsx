import React, { useEffect, useRef, useState } from "react";
import { IconButton } from "../buttons/icon-button";
import { SidebarIcon } from "../icons/sidebar-icon";
import { NewChatIcon } from "../icons/new-chat-icon";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { FaqIcon } from "../icons/faq-icon";
import { Navigation } from "./navigation";
import { History } from "./history/history";
import { SettingsIcon } from "../icons/settings-icon";
import { faqDialogId } from "../dialogs/faq-dialog/faq-dialog";
import { settingsDialogId } from "../dialogs/settings-dialog/settings-dialog";

const mdWidth = 768;

export const SideBar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(true);

	const { setCurrentChatId, currentChatId } = useCurrentChatIdStore();

	useEffect(() => {
		const isMobile = window.innerWidth < mdWidth;
		// close sidebar on mobile when a chat is selected
		if (isMobile) {
			setIsOpen(false);
		}
	}, [currentChatId]);

	const toggleIsSidebarOpenLabel = isOpen
		? "Seitenleiste schließen"
		: "Seitenleiste öffnen";

	const sidebarRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickListener);

		return () => {
			document.removeEventListener("mousedown", handleClickListener);
		};
	}, []);

	const handleClickListener = (event: MouseEvent) => {
		const isClickOutsideNavbar = !sidebarRef?.current?.contains(
			event.target as Node,
		);

		const isMobile = window.innerWidth < mdWidth;
		if (isMobile && isClickOutsideNavbar) {
			setIsOpen(false);
		}
	};

	return (
		<div
			className={`absolute md:relative top-0 pt-11 md:pt-0 left-0 z-20 text-ber-darker-grey ${
				isOpen
					? "w-full h-full backdrop-brightness-90 backdrop-blur-sm md:min-w-72 md:w-72 md:backdrop-blur-none md:backdrop-brightness-100"
					: ""
			}`}
		>
			<aside
				ref={sidebarRef}
				className={`flex flex-col z-30 justify-between overflow-hidden gap-10 overflow-x-hidden ${
					isOpen
						? "bg-ber-lighter-grey min-w-72 w-72 h-full pb-4"
						: "min-w-24 w-28 h-fit"
				}`}
				aria-label="Sidebar"
			>
				<div className={`flex justify-between px-5 mt-6 flex-row gap-2`}>
					<IconButton
						icon={<SidebarIcon />}
						ariaLabel={toggleIsSidebarOpenLabel}
						title={toggleIsSidebarOpenLabel}
						onClick={() => setIsOpen(!isOpen)}
					/>
					<IconButton
						icon={<NewChatIcon />}
						ariaLabel="Neuen Chat starten"
						title="Neuen Chat starten"
						onClick={() => setCurrentChatId(null)}
					/>
				</div>
				<div className={`flex-col flex gap-5 ${isOpen ? "flex" : "hidden"}`}>
					<a className={`flex-col font-bold px-5 text-xl`} href="/">
						BärGPT
					</a>

					<Navigation />
				</div>
				<div
					className={`flex-col pb-8 h-full overflow-y-auto ${isOpen ? "flex" : "hidden"}`}
				>
					<History />
				</div>
				<div
					className={`flex justify-start flex-row px-5 gap-2.5 ${isOpen ? "flex" : "hidden"}`}
				>
					<IconButton
						icon={<FaqIcon />}
						ariaLabel="FAQ"
						title="FAQ"
						onClick={() =>
							(
								document.getElementById(faqDialogId) as HTMLDialogElement
							)?.showModal()
						}
					/>
					<IconButton
						icon={<SettingsIcon />}
						ariaLabel="Einstellungen"
						title="Einstellungen"
						onClick={() =>
							(
								document.getElementById(settingsDialogId) as HTMLDialogElement
							)?.showModal()
						}
					/>
				</div>
			</aside>
		</div>
	);
};
