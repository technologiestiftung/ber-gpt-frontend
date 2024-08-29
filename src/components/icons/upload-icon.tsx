import React from "react";

interface UploadIconProps {
	className: string;
}

export const UploadIcon: React.FC<UploadIconProps> = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="25"
			viewBox="0 0 20 25"
			fill="none"
			className={className}
		>
			<path
				d="M8.75 21.25H11.25V16.0312L13.25 18.0312L15 16.25L10 11.25L5 16.25L6.78125 18L8.75 16.0312V21.25ZM2.5 25C1.8125 25 1.22396 24.7552 0.734375 24.2656C0.244792 23.776 0 23.1875 0 22.5V2.5C0 1.8125 0.244792 1.22396 0.734375 0.734375C1.22396 0.244792 1.8125 0 2.5 0H12.5L20 7.5V22.5C20 23.1875 19.7552 23.776 19.2656 24.2656C18.776 24.7552 18.1875 25 17.5 25H2.5ZM11.25 8.75V2.5H2.5V22.5H17.5V8.75H11.25Z"
				fill="currentColor"
			/>
		</svg>
	);
};
