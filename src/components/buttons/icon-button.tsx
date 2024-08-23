import React from "react";
import { ButtonProps } from "./button-types";

export const IconButton: React.FC<ButtonProps> = ({
	onClick,
	disabled,
	type = "button",
	ariaLabel,
	title,
	icon,
	className = "",
}) => {
	return (
		<button
			className={`flex size-[30px] items-center justify-center rounded-sm hover:text-ber-dark-grey text-ber-darker-grey ${className}`}
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
