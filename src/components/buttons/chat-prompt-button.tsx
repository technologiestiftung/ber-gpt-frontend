import React from "react";
import { ButtonProps } from "./button-types";

export const ChatPromptButton: React.FC<ButtonProps> = ({
	label,
	onClick,
	type = "button",
}) => {
	return (
		<button
			className={`text-sm md:text-base md:min-h-[129px] min-h-[140px] w-[155px]  bg-lighter-grey hover:bg-light-grey my-1.5 flex h-fit md:w-fit items-start justify-center rounded-sm p-2.5 font-normal text-darker-grey `}
			onClick={onClick}
			type={type}
		>
			<div className="md:w-[180px] text-start md:pb-2">{label}</div>
		</button>
	);
};
