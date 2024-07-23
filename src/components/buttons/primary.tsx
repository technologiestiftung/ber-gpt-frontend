import React from "react";

export interface PrimaryButtonProps {
	label: string | React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	type?: "button" | "submit";
	ariaLabel?: string;
	title?: string;
	isLoading?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
	label,
	onClick,
	disabled,
	type = "button",
	ariaLabel,
	title,
}) => {
	return (
		<button
			className={`my-2 flex h-[35px] w-fit items-center justify-center rounded bg-dark-blue px-3 text-sm font-semibold text-white outline-mid-grey hover:bg-light-blue hover:text-dark-blue active:bg-white active:font-normal active:text-dark-blue active:outline active:outline-1 disabled:bg-light-grey disabled:font-normal disabled:text-dark-blue disabled:active:outline-none`}
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
