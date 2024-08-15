import React from "react";
import { ButtonProps } from "./button-types";

export const TagButton: React.FC<ButtonProps> = ({
	label,
	onClick,
	disabled,
	type = "button",
	ariaLabel,
	title,
}) => {
	return (
		<button
			className={`
            rounded-full border border-darker-grey py-2 px-2.5 cursor-pointer
            hover:text-grey hover:border-grey text-sm
            active:bg-darker-grey active:text-white
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
