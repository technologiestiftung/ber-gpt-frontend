import React from "react";

export const RadioGroups: React.FC = () => {
	const radioGroups = [
		{
			label: "Wer ist der/die Empfänger:in?",
			name: "recipient",
			options: ["Kolleg:in", "Vorgesetzt:e", "Extern"],
			defaultChecked: "Kolleg:in",
		},
		{
			label: "Umfang der E-Mail",
			name: "scope",
			options: ["kurz", "mittel", "lang"],
			defaultChecked: "kurz",
		},
		{
			label: "Formulierung",
			name: "formality",
			options: ["formell", "informell"],
			defaultChecked: "formell",
		},
	];

	return (
		<>
			{radioGroups.map((group) => (
				<div key={group.name} className={"flex flex-col gap-y-2"}>
					<label htmlFor={group.name} className="font-bold">
						{group.label}
					</label>
					<div className="flex gap-x-2">
						{group.options.map((option) => (
							<React.Fragment key={option}>
								<label
									htmlFor={option}
									className={`
									rounded-full border border-ber-darker-grey py-1 px-2.5 cursor-pointer
									hover:text-ber-dark-grey hover:border-ber-dark-grey
									has-[:checked]:hover:bg-ber-dark-grey has-[:checked]:hover:text-white has-[:checked]:hover:border-ber-dark-grey
								  has-[:checked]:bg-ber-darker-grey has-[:checked]:text-white`}
								>
									{option}
									<input
										type="radio"
										id={option}
										name={group.name}
										value={option}
										className="appearance-none"
										defaultChecked={group.defaultChecked === option}
									/>
								</label>
							</React.Fragment>
						))}
					</div>
				</div>
			))}
		</>
	);
};
