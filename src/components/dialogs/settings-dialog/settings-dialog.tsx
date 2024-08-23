import React from "react";
import { DefaultDialog } from "../default-dialog";
import { useCurrentLLMStore } from "../../../store/current-llm-store";
import { SettingsOption } from "./settings-option";

export const settingsDialogId = "settings-dialog";

export const SettingsDialog: React.FC = () => {
	const { availableLLMs } = useCurrentLLMStore();

	return (
		<DefaultDialog id={settingsDialogId} className={"max-w-[67rem]"}>
			<div className="max-w-[39rem]">
				<h2 className="text-2xl font-bold">Einstellungen</h2>
				<h3 className="font-bold">Modellauswahl</h3>
				<p>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
					nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
					sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
					rebum
				</p>

				<div className="flex gap-x-2">
					{availableLLMs.map((option) => (
						<SettingsOption key={option.identifier} option={option} />
					))}
				</div>
			</div>
		</DefaultDialog>
	);
};
