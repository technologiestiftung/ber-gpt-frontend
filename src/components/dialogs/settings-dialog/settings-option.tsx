import React from "react";
import {
	AvailableLLM,
	useCurrentLLMStore,
} from "../../../store/current-llm-store";
import { CheckSolidIcon } from "../../icons/check-solid-icon";
import { UncheckIcon } from "../../icons/uncheck-icon";
import { CheckIcon } from "../../icons/check-icon";
import { UnavailableIcon } from "../../icons/unavailable-icon";

interface SettingsOptionProps {
	option: AvailableLLM;
}

export const SettingsOption: React.FC<SettingsOptionProps> = ({ option }) => {
	const { currentLLM, setCurrentLLM, availableLLMs } = useCurrentLLMStore();

	const isChecked = option.identifier === currentLLM?.identifier;

	return (
		<label
			htmlFor={option.identifier}
			className={`flex flex-row p-3 md:p-[18px] ${option.status.healthy ? "cursor-pointer" : "cursor-not-allowed"} gap-5 hover:bg-ber-lighter-grey  ${isChecked && "bg-ber-lighter-grey"}`}
		>
			<div className="mt-1">
				{isChecked && <CheckSolidIcon />}
				{!isChecked && <UncheckIcon />}
			</div>

			<div className="flex flex-col gap-2">
				<div className="flex flex-wrap gap-y-2 gap-x-5 mb-2">
					<div
						className={`font-bold text-lg ${option.status.healthy ? "" : "line-through"}`}
					>
						{option.identifier}
					</div>
					{option.provider === "Azure" && (
						<div className="text-white bg-ber-green-darker rounded-full px-2 text-sm flex items-center">
							empfohlen
						</div>
					)}
					{!option.status.healthy && (
						<div className="text-white bg-ber-red rounded-full px-2 text-sm flex items-center">
							temporär nicht verfügbar
						</div>
					)}
				</div>

				<p className="text-sm">{option.description}</p>

				<div className="flex-wrap flex gap-x-5 gap-y-1 text-sm">
					<div className="flex flex-row gap-2 items-center">
						<p className="font-bold">Datenschutzkonform</p>
						{option.isGdprCompliant ? <CheckIcon /> : <UnavailableIcon />}
					</div>
					<div className="flex flex-row gap-2 items-center">
						<p className="font-bold">Open Source</p>
						{option.isOpenSource ? <CheckIcon /> : <UnavailableIcon />}
					</div>
					<div className="flex flex-row gap-2 items-center">
						<p className="font-bold">Serverstandort</p>
						{option.provider && <p>{option.serverLocation}</p>}
					</div>
				</div>

				<input
					type="radio"
					id={option.identifier}
					name="model"
					value={option.identifier}
					className="appearance-none"
					checked={option.identifier === currentLLM?.identifier}
					onChange={(e) => {
						const foundLllm = availableLLMs.find(
							(llm) => llm.identifier === e.target.value,
						);
						if (foundLllm && foundLllm.status.healthy) {
							setCurrentLLM(foundLllm);
						}
					}}
				/>
			</div>
		</label>
	);
};
