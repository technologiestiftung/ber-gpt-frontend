import React, { useEffect } from "react";
import { useSplashStore } from "../../store/splash-store";
import { BaerIcon } from "../icons/bear-icon";
import { logoLinks } from "../logo-links";
import { DefaultDialog } from "./default-dialog";

const dialogId = "splash-screen-dialog";

export const SplashScreenDialog: React.FC = () => {
	const { hideSplashScreen, isSplashScreenVisible } = useSplashStore();

	useEffect(() => {
		if (!isSplashScreenVisible()) {
			return;
		}

		(document.getElementById(dialogId) as HTMLDialogElement).showModal();
	}, []);

	const links = [
		{
			href: "https://citylabberlin.typeform.com/to/kCdnCgvC#product_id=baergpt",
			text: "Feedback",
		},
		{ href: "https://citylab-berlin.org/de/start/", text: "Kontakt" },
		{
			href: "https://github.com/technologiestiftung/ber-gpt-frontend",
			text: "Quellcode",
		},
		{
			href: "https://citylab-berlin.org/de/data-privacy/",
			text: "Datenschutz",
		},
		{ href: "https://citylab-berlin.org/de/imprint/", text: "Impressum" },
	];

	return (
		<DefaultDialog
			id={dialogId}
			afterClose={hideSplashScreen}
			className={`h-fit w-fit rounded-sm bg-white shadow-lg backdrop:backdrop-blur-sm sm:h-fit sm:w-[540px] text-ber-darker-grey`}
		>
			<div className="relative flex flex-col gap-6 rounded-sm p-8">
				<div className="flex min-h-[63px] w-[63px] items-center justify-center bg-white border-black border">
					<BaerIcon className="h-[40px] w-[40px]" />
				</div>
				<div>
					<div className="text-[22px] font-bold leading-6">BärGPT</div>
					<div className="text-[22px] pl-0">KI-Testumgebung</div>
				</div>
				<p className="py-2">
					BärGPT ist eine produktiv nutzbare KI-Testumgebung für Beschäftigte
					der Berliner Landesverwaltung, bereitgestellt vom{" "}
					<a
						className="text-ber-mid-grey underline hover:text-ber-darker-grey"
						href="https://www.citylab-berlin.org"
					>
						CityLAB Berlin
					</a>
					. BärGPT soll dabei helfen, die Anwendungsmöglichkeiten von
					Künstlicher Intelligenz für die Verwaltungsarbeit in der Praxis zu
					erproben. Neben einer Chat-Funktion enthält BärGPT eine Reihe erster
					kleinerer Anwendungen (KI-Apps) für spezifische Aufgaben aus dem
					Verwaltungskontext. Die Liste an Anwendungen soll im Dialog mit
					Beschäftigten der Berliner Verwaltung kontinuierlich erweitert werden.
					Hierzu werden wir in Zukunft regelmäßige Workshop-Formate anbieten und
					freuen uns über Ideen und{" "}
					<a
						className="text-ber-mid-grey underline hover:text-ber-darker-grey"
						href="https://citylabberlin.typeform.com/to/kCdnCgvC#product_id=baergpt"
					>
						Feedback
					</a>
					.
				</p>

				<div className="flex flex-row flex-wrap justify-between gap-2">
					{links.map((link) => (
						<a
							key={link.text}
							href={link.href}
							className="text-ber-mid-grey underline hover:text-ber-darker-grey"
						>
							{link.text}
						</a>
					))}
				</div>
				<div className="flex flex-row flex-wrap justify-between gap-6">
					{logoLinks.map((logo) => (
						<a key={logo.alt} href={logo.href} target="_blank" rel="noreferrer">
							<img
								alt={logo.alt}
								src={logo.src}
								width={logo.width}
								height={logo.height}
							/>
						</a>
					))}
				</div>
			</div>
		</DefaultDialog>
	);
};
