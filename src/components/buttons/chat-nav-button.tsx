import React from "react";
import { ButtonProps } from "./button-types";

export const ChatNavButton: React.FC<ButtonProps> = ({
	label,
	onClick,
	disabled,
	type = "button",
	ariaLabel,
	title,
	icon,
	className,
}) => {
	return (
		<button
			className={`text-md min-h-[135px]  my-1.5 flex h-fit w-fit items-start justify-center rounded-sm  px-3 py-4 font-normal text-darker-grey  disabled:bg-light-grey disabled:font-normal disabled:text-mid-grey ${
				className
			}`}
			disabled={disabled}
			onClick={onClick}
			type={type}
			aria-label={ariaLabel}
			title={title}
		>
			<div className="flex w-[144px] flex-col items-start gap-2 md:w-[180px] md:pb-2">
				<div> {icon} </div>
				<div className="text-base text-start">{label}</div>
			</div>
		</button>
	);
};
