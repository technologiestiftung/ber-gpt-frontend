import React, { useState } from "react";
import { ArrowIcon } from "../icons/arrow-icon";

interface CollapsibleProps {
	question: string;
	answer: string | React.ReactNode;
	openByDefault?: boolean;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
	question,
	answer,
	openByDefault = false,
}) => {
	const [isExpanded, setIsExpanded] = useState(openByDefault);

	return (
		<div
			className={`flex flex-col rounded-sm border-2 transition-all duration-200 ease-in-out border-transparent bg-ber-lighter-grey p-4`}
		>
			<div className="flex flex-row justify-between">
				<button
					className="flex w-full flex-row justify-between text-left group"
					onClick={() => setIsExpanded(!isExpanded)}
				>
					<div className="text-[18px] font-bold leading-6">{question}</div>
					<ArrowIcon
						className={`size-4 md:h-6 text-ber-darker-grey hover:text-ber-darker-grey transition ${isExpanded ? "rotate-90 group-hover:rotate-0" : "rotate-0 group-hover:rotate-90"}`}
					/>
				</button>
			</div>

			{isExpanded && <div className="pt-5">{answer}</div>}
		</div>
	);
};
