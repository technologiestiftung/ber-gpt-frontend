import React from "react";
import { XIcon } from "../icons/x-icon";
import { QuestionAnswer } from "./question-answer";
import { qas } from "./qas";
import { logoLinks } from "../logo-links";

export const Faq: React.FC = () => {
	return (
		<dialog
			id="faq-dialog"
			className="z-50 w-11/12 max-w-[1000px] gap-4 overflow-y-auto rounded-sm border-2 border-mid-grey bg-white px-8 py-10 shadow-lg backdrop:backdrop-blur-sm md:max-h-[90%] md:w-5/6"
		>
			<div className="flex flex-col gap-4">
				<h1 className="px-2 text-[22px] font-bold leading-6">Über BärGPT</h1>
				<p className="p-2">
					BärGPT ist eine produktiv nutzbare KI-Testumgebung für
					Beschäftigte der Berliner Landesverwaltung, bereitgestellt vom{" "}
					<a className="text-mid-blue underline hover:text-dark-blue" href="https://www.citylab-berlin.org">CityLAB Berlin</a>. BärGPT
					soll dabei helfen, die Anwendungsmöglichkeiten von Künstlicher
					Intelligenz für die Verwaltungsarbeit in der Praxis zu erproben. Neben
					einer Chat-Funktion enthält BärGPT eine Reihe erster kleinerer
					Anwendungen (KI-Apps) für spezifische Aufgaben aus dem
					Verwaltungskontext. Die Liste an Anwendungen soll im Dialog mit
					Beschäftigten der Berliner Verwaltung kontinuierlich erweitert werden.
					Hierzu werden wir in Zukunft regelmäßige Workshop-Formate anbieten und
					freuen uns über Ideen und{" "}
					<a
						className="text-mid-blue underline hover:text-dark-blue"
						href="https://citylabberlin.typeform.com/to/kCdnCgvC#product_id=baergpt"
					>
						Feedback
					</a>.
				</p>
				<h1 className="px-2 pt-2 text-[22px] font-bold leading-6">
					Häufig gestellte Fragen
				</h1>
				{qas.map((qa) => (
					<QuestionAnswer
						key={qa.question}
						question={qa.question}
						answer={qa.answer}
					/>
				))}
				<div className="flex flex-row flex-wrap justify-start gap-10 border-t border-mid-grey p-2 pt-6">
					{logoLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							target="_blank"
							rel="noreferrer"
						>
							<img
								alt={link.alt}
								src={link.src}
								width={link.width}
								height={link.height}
							/>
						</a>
					))}
				</div>

				<button
					className="text-darker-blue absolute right-4 top-4 pb-2 hover:text-dark-grey"
					onClick={() => {
						(
							document.getElementById("faq-dialog") as HTMLDialogElement
						).close();
					}}
				>
					<XIcon className="h-6 w-6" />
				</button>
			</div>
		</dialog>
	);
};
