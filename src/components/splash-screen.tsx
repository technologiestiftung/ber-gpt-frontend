import React, { useEffect, useRef } from "react";
import { useSplashStore } from "../store/splash-store";
import { BaerIcon } from "./icons/bear-icon";
import { XIcon } from "./icons/x-icon";
import { logoLinks } from "./logo-links";

export const SplashScreen: React.FC = () => {
	const { hideSplashScreen } = useSplashStore();

	const splashContainer = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickListener);

		return () => {
			document.removeEventListener("mousedown", handleClickListener);
		};
	}, []);

	const handleClickListener = (event: MouseEvent) => {
		const clickedInside =
			splashContainer &&
			splashContainer.current?.contains(event.target as Node);

		if (clickedInside) {
			return;
		}

		hideSplashScreen();
	};

	const links = [
		{
			href: "https://citylabberlin.typeform.com/to/kCdnCgvC#product_id=baergpt",
			text: "Feedback",
		},
		{ href: "https://citylab-berlin.org/de/start/", text: "Kontakt" },
		{
			href: "https://citylab-berlin.org/de/data-privacy/",
			text: "Datenschutz",
		},
		{ href: "https://citylab-berlin.org/de/imprint/", text: "Impressum" },
	];

	return (
		<div
			ref={splashContainer}
			className={`pointer-events-auto relative z-50 m-1 flex h-fit w-fit rounded-sm border border-mid-grey bg-white shadow-lg sm:mx-auto sm:my-10 sm:h-fit sm:w-[540px]`}
		>
			<div className="relative flex flex-col gap-6 rounded-sm p-8">
				<div className="flex min-h-[63px] w-[63px] items-center justify-center rounded-full bg-white drop-shadow-lg">
					<BaerIcon className="h-[40px] w-[40px]" />
				</div>
				<div>
					<h1 className="text-[22px] font-bold leading-6">BärGPT</h1>
					<h2 className="text-[22px]">KI-Testumgebung</h2>
				</div>
				<p className="py-2">
					BärGPT ist eine produktiv nutzbare KI-Testumgebung für Beschäftigte
					der Berliner Landesverwaltung, bereitgestellt vom{" "}
					<a
						className="text-mid-blue underline hover:text-dark-blue"
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
						className="text-mid-blue underline hover:text-dark-blue"
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
							className="text-mid-blue underline hover:text-dark-blue"
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

			<button
				className="absolute right-4 top-4 pb-2 text-dark-blue hover:text-mid-blue"
				onClick={hideSplashScreen}
			>
				<XIcon className="h-6 w-6" />
			</button>
		</div>
	);
};
