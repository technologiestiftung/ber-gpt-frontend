import React from "react";
import { ButtonProps } from "./button-types";

export const TagButton: React.FC<ButtonProps> = ({
	label,
	onClick,
	disabled,
	type = "button",
	ariaLabel,
	title,
	className = "",
}) => {
	return (
		<button
			className={`
            rounded-full border border-ber-darker-grey py-1 px-2.5 cursor-pointer
            hover:bg-ber-darker-grey hover:text-white active:text-white
			${className}
           `}
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
