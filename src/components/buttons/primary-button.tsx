import React from "react";
import { ButtonProps } from "./button-types";

export const PrimaryButton: React.FC<ButtonProps> = ({
	label,
	onClick,
	disabled,
	type = "button",
	ariaLabel,
	title,
	className,
}) => {
	return (
		<button
			className={`
			my-2 flex min-h-[46px] w-fit items-center justify-center rounded-sm bg-ber-darker-grey px-4 text-lg
			text-white outline--grey hover:bg-grey hover:underline
			${className ? className : ""}`}
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
