import React from "react";

export const Header: React.FC = () => {
	return (
		<header className="flex items-start z-40 bg-white px-5 py-1.5 border-b border-mid-grey">
			<img
				className="sm:pl-0 min-w-[100px] w-[100px]"
				src="https://logos.citylab-berlin.org/logo-berlin.svg"
				alt="Berlin Logo"
			/>
		</header>
	);
};
