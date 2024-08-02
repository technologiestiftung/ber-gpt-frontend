import React, { useEffect, useRef } from "react";
import { useSplashStore } from "../store/splash-store";
import { BaerIcon } from "./icons/bear-icon";
import { XIcon } from "./icons/x-icon";

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
		{ href: "https://citylab-berlin.org/de/start/", text: "Feedback" },
		{ href: "https://citylab-berlin.org/de/start/", text: "Kontakt" },
		{ href: "https://citylab-berlin.org/de/data-privacy/", text: "Datenschutz" },
		{ href: "https://citylab-berlin.org/de/imprint/", text: "Impressum" },
	];

	const logoLinks = [
		{
			href: "https://citylab-berlin.org/de/start/",
			alt: "Logo CityLAB Berlin",
			src: "https://logos.citylab-berlin.org/logo-citylab-color.svg",
			width: 131,
			height: 28,
		},
		{
			href: "https://technologiestiftung-berlin.de/",
			alt: "Logo der Technologiestiftung Berlin",
			src: "https://logos.citylab-berlin.org/logo-tsb-outline.svg",
			width: 92,
			height: 28,
		},
		{
			href: "https://www.berlin.de/senatskanzlei/",
			alt: "Logo des Regierenden Bürgermeisters von Berlin und der Senatskanzlei",
			src: "https://logos.citylab-berlin.org/logo-senatskanzlei-buergermeister-horizontal.svg",
			width: 168,
			height: 28,
		},
	];

	return (
		<div
			ref={splashContainer}
			className={`pointer-events-auto m-1 flex h-fit w-fit rounded border-2 border-mid-grey bg-white shadow-lg sm:mx-auto sm:my-10 sm:h-fit sm:w-[510px]`}
		>
			<div className="relative flex flex-col gap-6 rounded p-8"></div>
				<div className="flex min-h-[63px] w-[63px] items-center justify-center rounded-full bg-white drop-shadow-lg">
					<BaerIcon className="h-[40px] w-[40px]" />
				</div>
				<div>
					<h1 className="text-[22px] font-bold leading-6">BärGPT</h1>
					<h2 className="text-[22px]">KI Testumgebung</h2>
				</div>
				<p className="py-2">
					Der Einsatz von <b>BärGPT</b> in der öffentlichen Verwaltung bietet
					eine Vielzahl von Vorteilen für Mitarbeitende. Es kann Routineanfragen
					effizient und rund um die Uhr beantworten, wodurch Verwaltungspersonal
					entlastet und der Service für Bürgerinnen und Bürger verbessert wird.
					Mitarbeitende können sich so auf komplexere und wertschöpfendere
					Aufgaben konzentrieren. Darüber hinaus tragen Chatbots zur
					Beschleunigung von Verwaltungsprozessen bei und erhöhen die
					Zufriedenheit der Bürger:innen durch schnellere und präzisere
					Auskünfte. Letztlich fördert BärGPT eine moderne, digitale Berliner
					Verwaltung und verbessert die Effizienz sowie Servicequalität.
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
						<a
							key={logo.alt}
							href={logo.href}
							target="_blank"
							rel="noreferrer"
						>
							<img
								alt={logo.alt}
								src={logo.src}
								width={logo.width}
								height={logo.height}
							/>
						</a>
					))}
				</div>

				<button
					className="absolute right-4 top-4 pb-2 text-dark-blue hover:text-mid-blue"
					onClick={hideSplashScreen}
				>
					<XIcon className="h-6 w-6" />
				</button>
			</div>
		</div>
	);
};
