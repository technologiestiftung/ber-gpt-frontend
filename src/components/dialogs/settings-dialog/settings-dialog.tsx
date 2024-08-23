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
			className={"max-w-[1076px] w-5/6 px-24 pt-12 pb-8"}
		>
			<div className="w-full flex justify-center">
				<div className="flex flex-col max-w-[600px] gap-y-7">
					<h2 className="text-2xl font-bold mb-4">Einstellungen</h2>
					<div className="text-lg flex flex-col gap-3">
						<h3 className="font-bold">Modellauswahl</h3>
						<p>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
							nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
							erat, sed diam voluptua. At vero eos et accusam et justo duo
							dolores et ea rebum
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
