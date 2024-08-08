import React from "react";

export const Header: React.FC = () => {
	return (
		<header className="flex items-start z-40 bg-white px-5 py-2 border-b border-darker-grey">
			<img
				className="w-20 sm:pl-0 md:w-32"
				src="https://logos.citylab-berlin.org/logo-berlin.svg"
				alt="Berlin Logo"
			/>
		</header>
	);
};
