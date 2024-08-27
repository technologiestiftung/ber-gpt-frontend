import React from "react";
import { DefaultDialog } from "../default-dialog";
import { useCurrentLLMStore } from "../../../store/current-llm-store";
import { SettingsOption } from "./settings-option";

export const settingsDialogId = "settings-dialog";

export const SettingsDialog: React.FC = () => {
	const { availableLLMs } = useCurrentLLMStore();

	return (
		<DefaultDialog
			id={settingsDialogId}
			className="z-50 max-w-[1080px] rounded-sm w-11/12 max-h-[90%] h-[90%] md:w-5/6 p-5 pt-8 md:p-12 md:pb-8 shadow-lg bg-white backdrop:backdrop-blur-sm overflow-y-auto"
		>
			<div className="w-full flex justify-center">
				<div className="flex flex-col max-w-[600px] gap-y-5 md:gap-y-5">
					<h2 className="text-2xl font-bold">Einstellungen</h2>
					<div className="text-lg flex flex-col gap-3">
						<h3 className="font-bold">Modellauswahl</h3>
						<p>
							Für den Test von BärGPT stehen verschiedene Large Language Modelle zur Auswahl. Bitte beachten Sie die Angaben zu Datenschutz und Serverstandort. Wir empfehlen aktuell das Modell azure-gpt-4o-mini, welches den Anforderungen an die DSGVO entspricht.
						</p>
					</div>

					<div className="flex flex-col gap-x-2">
						{availableLLMs.map((option) => (
							<SettingsOption key={option.identifier} option={option} />
						))}
					</div>
				</div>
			</div>
		</DefaultDialog>
	);
};
