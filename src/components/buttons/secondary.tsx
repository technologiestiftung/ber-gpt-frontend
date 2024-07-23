import React from "react";

export interface PrimaryButtonProps {
	label: string | React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	type?: "button" | "submit";
	ariaLabel?: string;
	isLoading?: boolean;
}

export const SecondaryButton: React.FC<PrimaryButtonProps> = ({
	label,
	onClick,
	disabled,
	type = "button",
	ariaLabel,
}) => {
	return (
		<button
			className={`hover:bg-light-grey text-dark-blue outline-mid-grey my-2 flex h-[35px] w-fit items-center justify-center rounded bg-white px-3 text-sm font-normal outline outline-1 active:bg-white active:font-semibold`}
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
