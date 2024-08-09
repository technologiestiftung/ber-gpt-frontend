import React, { useEffect, useRef, useState } from "react";
import { IconButton } from "../buttons/icon-button";
import { SidebarIcon } from "../icons/sidebar-icon";
import { NewChatIcon } from "../icons/new-chat-icon";
import { useCurrentChatIdStore } from "../../store/current-chat-id-store";
import { FaqIcon } from "../icons/faq-icon";
import { Navigation } from "./navigation";
import { History } from "./history/history";

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
			className={`absolute md:relative top-0 pt-11 md:pt-0 left-0 z-20 ${
				isOpen
					? "w-full h-full backdrop-brightness-90 mh:min-w-72 md:w-72 md:backdrop-brightness-100"
					: ""
			}`}
		>
			<aside
				ref={sidebarRef}
				className={`flex flex-col z-30 justify-between overflow-hidden gap-2 overflow-x-hidden ${
					isOpen
						? "bg-sidebar-grey min-w-72 w-72 h-full pb-4"
						: "min-w-24 w-28 h-fit"
				}`}
				aria-label="Sidebar"
			>
				<div className={`flex justify-between px-5 pt-2 flex-row gap-2`}>
					<IconButton
						isOutlineVisible={!isOpen}
						icon={<SidebarIcon />}
						ariaLabel={toggleIsSidebarOpenLabel}
						title={toggleIsSidebarOpenLabel}
						onClick={() => setIsOpen(!isOpen)}
					/>
					<IconButton
						isOutlineVisible={!isOpen}
						icon={<NewChatIcon />}
						ariaLabel="Neuen Chat starten"
						title="Neuen Chat starten"
						onClick={() => setCurrentChatId(null)}
					/>
				</div>
				<div
					className={`flex-col gap-8 pb-8 h-full overflow-y-auto ${isOpen ? "flex" : "hidden"}`}
				>
					<div
						className={`flex-col px-5 text-[22px] ${isOpen ? "flex" : "hidden"}`}
					>
						<h1 className="font-bold">BärGPT</h1>
						<h2>KI-Testumgebung</h2>
					</div>

					<Navigation />

					<History />

					<div className={`px-5 text-sm text-dark-blue`}>
						Der Chat Verlauf wird lokal gespeichert und ist somit nicht für
						andere Personen sichtbar.
					</div>
				</div>
				<button
					className={`px-5 w-fit text-dark-blue hover:text-light-blue ${isOpen ? "flex" : "hidden"}`}
					onClick={() =>
						(
							document.getElementById("faq-dialog") as HTMLDialogElement
						).showModal()
					}
				>
					<FaqIcon className="h-6 w-6" />
				</button>
			</aside>
		</div>
	);
};
