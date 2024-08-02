import React from "react";
import { XIcon } from "../icons/x-icon";
import { QuestionAnswer } from "./question-answer";
import { qas } from "./qas";
import { logoLinks } from "../logo-links";

export const Faq: React.FC = () => {
	return (
		<dialog
			id="faq-dialog"
			className="z-50 max-h-[90%] w-5/6 max-w-[1000px] gap-4 overflow-y-auto rounded-md border-2 border-mid-grey bg-white px-8 py-10 shadow-lg backdrop:backdrop-blur-sm"
		>
			<div className="flex flex-col gap-4">
				<h1 className="px-2 text-[22px] font-bold leading-6">Über BärGPT</h1>
				<p className="p-2">
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
				<h1 className="px-2 pt-2 text-[22px] font-bold leading-6">
					Häufig gestellte Fragen:
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
