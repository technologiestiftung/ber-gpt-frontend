import React from "react";
import { ButtonProps } from "./button-types";

interface ChatBoxButtonProps {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	value: string;
}

export const ChatBoxButton: React.FC<ButtonProps & ChatBoxButtonProps> = ({
	label,
	onClick,
	disabled,
	type = "button",
	ariaLabel,
	title,
	icon,
	onSubmit,
	value,
}) => {
	return (
		<form onSubmit={onSubmit}>
			<input className="hidden" name="message" type="text" value={value} />
			<button
				className={`text-md my-2 flex h-fit w-fit items-center justify-center rounded bg-white px-4 py-6 font-normal text-dark-blue outline outline-2 outline-mid-grey hover:bg-light-grey active:bg-white disabled:bg-white disabled:font-normal disabled:text-mid-grey`}
				disabled={disabled}
				onClick={onClick}
				type={type}
				aria-label={ariaLabel}
				title={title}
			>
				<div className="flex w-[180px] flex-col items-start gap-3 pb-2">
					<div> {icon} </div>
					<div className="text-md text-start">{label}</div>
				</div>
			</button>
		</form>
	);
};
