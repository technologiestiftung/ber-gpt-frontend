import React from "react";
import { ButtonProps } from "./button-types";

export const ChatBoxButton: React.FC<ButtonProps> = ({
	label,
	onClick,
	disabled,
	type = "button",
	ariaLabel,
	title,
	icon,
}) => {
	return (
		<button
			className={`text-md my-2 flex h-fit w-fit items-center justify-center rounded bg-white px-4 py-6 font-normal text-dark-blue outline outline-1 outline-mid-grey hover:bg-light-grey active:bg-white disabled:bg-white disabled:font-normal disabled:text-mid-grey`}
			disabled={disabled}
			onClick={onClick}
			type={type}
			aria-label={ariaLabel}
			title={title}
		>
			<span>
				<div className="flex w-[180px] flex-col items-start gap-3 pb-2">
					<div> {icon} </div>
					<div className="text-md text-start">{label}</div>
				</div>
			</span>
		</button>
	);
};
