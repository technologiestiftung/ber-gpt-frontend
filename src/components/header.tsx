import React from "react";

export const Header: React.FC = () => {
	return (
		<header className="flex flex-col">
			<img
				className="w-32"
				src="https://logos.citylab-berlin.org/logo-berlin.svg"
				alt={"Berlin Logo"}
			/>
			<div className="flex pt-10">
				<div className="w-96">
					<h1 className="text-2xl font-bold">BärGPT</h1>
					<h2 className="text-2xl">KI Testumgebung</h2>
				</div>
				<nav className="flex w-full">
					<ul className="flex w-full justify-between">
						{[
							"Chatfunktion",
							"E-Mail Funktion",
							"Vermerk Funktion",
							"Zusammenfassen",
						].map((item) => (
							<li key={item}>
								<a className="text-dark-grey">{item}</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
};
