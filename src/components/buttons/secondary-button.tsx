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
			className={`
			my-2 flex min-h-[35px] w-fit items-center justify-center rounded-sm bg-white px-1.5 
			text-sm font-normal text-darker-grey outline outline-1 outline-darker-grey 
			hover:bg-light-grey active:bg-white active:font-semibold 
			disabled:bg-white disabled:font-normal disabled:text-mid-grey md:px-3`}
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
