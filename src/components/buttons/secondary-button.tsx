import React from "react";
import { ButtonProps } from "./button-types";

export const SecondaryButton: React.FC<ButtonProps> = ({
	label,
	onClick,
	disabled,
	type = "button",
	ariaLabel,
	title,
}) => {
	return (
		<button
			className={`my-2 flex min-h-[35px] w-fit items-center justify-center rounded bg-white px-3 text-sm font-normal text-dark-blue outline outline-1 outline-mid-grey hover:bg-light-grey active:bg-white active:font-semibold disabled:bg-white disabled:font-normal disabled:text-mid-grey`}
			disabled={disabled}
			onClick={onClick}
			type={type}
			aria-label={ariaLabel}
			title={title}
		>
			<span>{label}</span>
		</button>
	);
};
