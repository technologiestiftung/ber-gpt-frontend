import React from "react";

export const Footer: React.FC = () => {
	return (
		<footer className="flex w-full">
			<a href="https://citylab-berlin.org/" target="_blank" rel="noreferrer">
				<img
					className="w-32"
					src="https://logos.citylab-berlin.org/logo-citylab-color.svg"
					alt={"Link zu CityLAB Berlin Webseite"}
				/>
			</a>
		</footer>
	);
};
