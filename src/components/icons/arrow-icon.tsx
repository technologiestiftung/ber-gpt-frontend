import React from "react";

interface ArrowIconProps {
	className?: string;
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="30"
			height="30"
			viewBox="0 0 30 30"
			fill="none"
			className={className}
		>
			<path
				d="M22.2374 16.4171C23.0095 15.6358 23.0095 14.3671 22.2374 13.5858L10.3773 1.58584C9.6052 0.804588 8.35124 0.804588 7.5791 1.58584C6.80696 2.36709 6.80696 3.63584 7.5791 4.41709L18.0431 15.0046L7.58528 25.5921C6.81314 26.3733 6.81314 27.6421 7.58528 28.4233C8.35742 29.2046 9.61137 29.2046 10.3835 28.4233L22.2436 16.4233L22.2374 16.4171Z"
				fill="currentColor"
			/>
		</svg>
	);
};
