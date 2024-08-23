import React from "react";
import {
	availableLLM,
	defaultModelIdentifier,
	useCurrentLLMStore,
} from "../../../store/current-llm-store";
import { CheckSolidIcon } from "../../icons/check-solid-icon";
import { UncheckIcon } from "../../icons/uncheck-icon";

interface SettingsOptionProps {
	option: availableLLM;
}

export const SettingsOption: React.FC<SettingsOptionProps> = ({ option }) => {
	const { currentLLM, setCurrentLLM } = useCurrentLLMStore();

	const isChecked = option.identifier === currentLLM;

	return (
		<label
			htmlFor={option.identifier}
			className="flex py-2 px-2.5 cursor-pointer"
		>
			{isChecked && <CheckSolidIcon />}
			{!isChecked && <UncheckIcon />}
			<p></p>
			{option.identifier}
			<input
				type="radio"
				id={option.identifier}
				name={"model"}
				value={option.identifier}
				className="appearance-none"
				defaultChecked={option.identifier === defaultModelIdentifier}
				checked={option.identifier === currentLLM}
				onChange={(e) => setCurrentLLM(e.target.value)}
			/>
		</label>
	);
};
