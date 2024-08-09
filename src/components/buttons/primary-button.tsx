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
			className={`my-2 flex min-h-[35px] w-fit items-center justify-center rounded bg-dark-blue px-3 text-sm font-semibold text-white outline-mid-grey hover:bg-light-blue hover:text-dark-blue active:bg-white active:text-dark-blue active:outline active:outline-1 disabled:bg-lighter-grey disabled:font-normal disabled:text-darker-grey disabled:active:outline-none ${className ? className : ""}`}
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
