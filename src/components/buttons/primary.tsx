import React from "react";

export interface PrimaryButtonProps {
	label: string | React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	type?: "button" | "submit";
	ariaLabel?: string;
	isLoading?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
	label,
	onClick,
	disabled,
	type = "button",
	ariaLabel,
}) => {
	return (
		<button
			className={`bg-dark-blue hover:bg-light-blue disabled:bg-light-grey hover:text-dark-blue disabled:text-dark-blue active:text-dark-blue outline-mid-grey my-2 flex h-[35px] w-fit items-center justify-center rounded px-3 text-sm font-semibold text-white active:bg-white active:font-normal active:outline active:outline-1 disabled:font-normal disabled:active:outline-none`}
			disabled={disabled}
			onClick={onClick}
			type={type}
			aria-label={ariaLabel}
			title={ariaLabel}
		>
			<span>{label}</span>
		</button>
	);
};
