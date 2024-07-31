import React from "react";

interface XIconProps {
	className?: string;
}

export const XIcon: React.FC<XIconProps> = ({ className }) => {
	return (
		<svg
			width="13.5"
			height="13.5"
			viewBox="0 0 9 8"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M1 1L7.5 7.5M1 7.5L7.5 1"
				stroke="currentColor"
				strokeWidth={1.5}
				strokeLinecap="round"
			/>
		</svg>
	);
};
