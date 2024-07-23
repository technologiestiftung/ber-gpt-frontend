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

export const SecondaryButton: React.FC<PrimaryButtonProps> = ({
	label,
	onClick,
	disabled,
	type = "button",
	ariaLabel,
	title,
}) => {
	return (
		<button
			className={`my-2 flex h-[35px] w-fit items-center justify-center rounded bg-white px-3 text-sm font-normal text-dark-blue outline outline-1 outline-mid-grey hover:bg-light-grey active:bg-white active:font-semibold`}
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
