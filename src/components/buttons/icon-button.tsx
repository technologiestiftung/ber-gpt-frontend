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
	className = "",
}) => {
	return (
		<button
			className={`${isOutlineVisible ? "outline-mid-grey outline-1" : ""} outline-0 outline-mid-grey my-2 flex size-[34px] items-center justify-center hover:outline-1 rounded-sm p-4 text-darker-grey outline  hover:bg-light-grey hover:outline-mid-grey active:bg-white disabled:bg-white disabled:text-mid-grey ${className}`}
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
