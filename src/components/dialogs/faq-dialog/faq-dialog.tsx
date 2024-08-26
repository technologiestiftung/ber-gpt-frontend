import React from "react";
import { QuestionAnswer } from "./question-answer";
import { qas } from "./qas";
import { logoLinks } from "../../logo-links";
import { DefaultDialog } from "../default-dialog";

export const faqDialogId = "faq-dialog";

export const FaqDialog: React.FC = () => {
	return (
		<DefaultDialog
			id={faqDialogId}
			className="z-50 max-w-[1080px] rounded-sm w-11/12 max-h-[90%] h-[90%] md:w-5/6 p-5 pt-8 md:p-12 md:pb-8 shadow-lg bg-white backdrop:backdrop-blur-sm overflow-y-auto"
		>
			<div className="w-full h-full flex justify-center">
				<div className="flex flex-col justify-between gap-7 max-w-[600px]">
					<div className="flex flex-col gap-7">
						<h1 className="text-[22px] font-bold leading-6">Über BärGPT</h1>
						<p>
							BärGPT ist eine produktiv nutzbare KI-Testumgebung für
							Beschäftigte der Berliner Landesverwaltung, bereitgestellt vom{" "}
							<a
								className="text-ber-mid-grey underline hover:text-ber-darker-grey"
								href="https://www.citylab-berlin.org"
							>
								CityLAB Berlin
							</a>
							. BärGPT soll dabei helfen, die Anwendungsmöglichkeiten von
							Künstlicher Intelligenz für die Verwaltungsarbeit in der Praxis zu
							erproben. Neben einer Chat-Funktion enthält BärGPT eine Reihe
							erster kleinerer Anwendungen (KI-Apps) für spezifische Aufgaben
							aus dem Verwaltungskontext. Die Liste an Anwendungen soll im
							Dialog mit Beschäftigten der Berliner Verwaltung kontinuierlich
							erweitert werden. Hierzu werden wir in Zukunft regelmäßige
							Workshop-Formate anbieten und freuen uns über Ideen und{" "}
							<a
								className="text-ber-mid-grey underline hover:text-ber-darker-grey"
								href="https://citylabberlin.typeform.com/to/kCdnCgvC#product_id=baergpt"
							>
								Feedback
							</a>
							.
						</p>
						<h1 className="text-[22px] font-bold leading-6">
							Häufig gestellte Fragen
						</h1>
						{qas.map((qa) => (
							<QuestionAnswer
								key={qa.question}
								question={qa.question}
								answer={qa.answer}
							/>
						))}
					</div>
					<div className="flex flex-row flex-wrap justify-start gap-10 border-t border-ber-light-grey py-6">
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
				</div>
			</div>
		</DefaultDialog>
	);
};
