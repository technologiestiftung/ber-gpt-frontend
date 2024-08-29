import React from "react";

interface SendIconProps {
	className?: string;
}

export const SendIcon: React.FC<SendIconProps> = ({ className }) => (
	<svg
		width="32"
		height="32"
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
	>
		<rect width="32" height="32" rx="2" fill="currentColor" />
		<path
			d="M14.625 27V10.2594L6.925 17.9594L5 16L16 5L27 16L25.075 17.9594L17.375 10.2594V27H14.625Z"
			fill="white"
		/>
	</svg>
);
