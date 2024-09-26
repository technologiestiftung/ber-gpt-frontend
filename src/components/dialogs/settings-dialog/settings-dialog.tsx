import React from "react";
import { DefaultDialog } from "../default-dialog";
import { useCurrentLLMStore } from "../../../store/current-llm-store";
import { SettingsOption } from "./settings-option";
import { ErrorIcon } from "../../icons/error-icon";
import { RefreshIcon } from "../../icons/refresh-icon";

export const settingsDialogId = "settings-dialog";

export const SettingsDialog: React.FC = () => {
	const { availableLLMs, currentLLM, getAvailableLLMs } = useCurrentLLMStore();

	return (
		<DefaultDialog
			id={settingsDialogId}
			className="z-50 max-w-[1080px] rounded-sm w-11/12 max-h-[90%] h-[90%] md:w-5/6 p-5 pt-8 md:p-12 md:pb-8 shadow-lg bg-white backdrop:backdrop-blur-sm overflow-y-auto"
		>
			<div className="w-full flex justify-center">
				<div className="flex flex-col max-w-[600px] gap-y-5 md:gap-y-5">
					<div className="text-2xl font-bold">Einstellungen</div>

					<div className="text-lg flex flex-col gap-3">
						<div className="font-bold">Modellauswahl</div>
						<p>
							Für den Test von BärGPT stehen verschiedene Large Language Modelle
							zur Auswahl. Bitte beachten Sie die Angaben zu Datenschutz und
							Serverstandort. Wir empfehlen aktuell das Modell
							azure-gpt-4o-mini, welches den Anforderungen an die DSGVO
							entspricht.
						</p>
					</div>
					<div className="flex flex-col gap-x-2">
						{availableLLMs.map((option) => (
							<SettingsOption key={option.identifier} option={option} />
						))}
					</div>
					{currentLLM && !currentLLM.status.healthy && (
						<div className="text-sm md:text-lg">
							<div className="flex w-full flex-row">
								<div className="w-full flex flex-row items-center justify-between gap-4 rounded-sm border-4 border-ber-orange bg-white px-6 py-4 text-[16px] font-semibold text-ber-darker-grey shadow-md">
									<ErrorIcon />
									Das derzeit gewählte Modell ist temporär nicht verfügbar,
									bitte wählen Sie ein alternatives Modell.
									<button
										className="pl-8"
										onClick={async () => {
											await getAvailableLLMs();
										}}
									>
										<RefreshIcon />
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</DefaultDialog>
	);
};
