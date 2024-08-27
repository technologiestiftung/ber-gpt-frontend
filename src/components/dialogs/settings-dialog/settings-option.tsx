import React from "react";
import {
	availableLLM,
	defaultModelIdentifier,
	useCurrentLLMStore,
} from "../../../store/current-llm-store";
import { CheckSolidIcon } from "../../icons/check-solid-icon";
import { UncheckIcon } from "../../icons/uncheck-icon";
import { CheckIcon } from "../../icons/check-icon";
import { UnavailableIcon } from "../../icons/unavailable-icon";

interface SettingsOptionProps {
	option: availableLLM;
}

export const SettingsOption: React.FC<SettingsOptionProps> = ({ option }) => {
	const { currentLLM, setCurrentLLM } = useCurrentLLMStore();

	const isChecked = option.identifier === currentLLM;

	const descriptionText = (() => {
		switch (option.provider) {
			case "Azure":
				return "Aktuelles Modell von Open AI, datenschutzkonform gehostet von Microsoft Azure.";
			case "OpenAI":
				return "Aktuelles Modell von Open AI, gehostet von Open AI.";
			case "Ollama":
				return "Open Source-Modell von Meta, datenschutzkonform gehostet im CityLAB Berlin.";
			default:
				return "";
		}
	})();

	const serverLocation = (() => {
		switch (option.provider) {
			case "Azure":
				return "Schweden";
			case "Ollama":
				return "Berlin";
			case "OpenAI":
				return "USA";
			default:
				return "";
		}
	})();

	return (
		<label
			htmlFor={option.identifier}
			className={`flex flex-row p-3 md:p-[18px] cursor-pointer gap-5 hover:bg-ber-lighter-grey  ${isChecked && "bg-ber-lighter-grey"}`}
		>
			<div className="mt-1">
				{isChecked && <CheckSolidIcon />}
				{!isChecked && <UncheckIcon />}
			</div>

			<div className="flex flex-col gap-2">
				<div className="flex flex-wrap gap-y-2 gap-x-5 mb-2">
					<h3 className="font-bold text-lg">{option.identifier}</h3>
					{option.provider === "Azure" && (
						<div className="text-white bg-ber-green-darker rounded-full px-2 text-sm flex items-center">
							empfohlen
						</div>
					)}
				</div>

				<p className="text-sm">{descriptionText}</p>

				<div className="flex-wrap flex gap-x-5 gap-y-1 text-sm">
					<div className="flex flex-row gap-2 items-center">
						<p className="font-bold">Datenschutzkonform</p>
						{option.isGdprCompliant ? <CheckIcon /> : <UnavailableIcon />}
					</div>
					<div className="flex flex-row gap-2 items-center">
						<p className="font-bold">Open Source</p>
						{option.provider === "Ollama" ? <CheckIcon /> : <UnavailableIcon />}
					</div>
					<div className="flex flex-row gap-2 items-center">
						<p className="font-bold">Serverstandort</p>
						{option.provider && <p>{serverLocation}</p>}
					</div>
				</div>

				<input
					type="radio"
					id={option.identifier}
					name="model"
					value={option.identifier}
					className="appearance-none"
					defaultChecked={option.identifier === defaultModelIdentifier}
					checked={option.identifier === currentLLM}
					onChange={(e) => setCurrentLLM(e.target.value)}
				/>
			</div>
		</label>
	);
};
