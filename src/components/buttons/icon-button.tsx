import React from "react";
import { ButtonProps } from "./button-types";

export const IconButton: React.FC<ButtonProps> = ({
	onClick,
	disabled,
	type = "button",
	ariaLabel,
	title,
	icon,
	isOutlineVisible = true,
}) => {
	return (
		<button
			className={`${isOutlineVisible ? "outline-mid-grey" : "outline-white"} my-2 flex size-[34px] items-center justify-center rounded bg-white p-4 text-dark-blue outline outline-1 outline-mid-grey hover:bg-light-grey hover:outline-mid-grey active:bg-white disabled:bg-white disabled:text-mid-grey`}
			disabled={disabled}
			onClick={onClick}
			type={type}
			aria-label={ariaLabel}
			title={title}
		>
			<div> {icon} </div>
		</button>
	);
};
