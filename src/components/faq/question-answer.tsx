import React, { useState } from "react";
import { ArrowIcon } from "../icons/arrow-icon";

interface QuestionAnswerProps {
	question: string;
	answer: string;
}

export const QuestionAnswer: React.FC<QuestionAnswerProps> = ({
	question,
	answer,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div
			className={`flex flex-col rounded-sm border-2 p-2 py-2 transition-all duration-200 ease-in-out border-transparent`}
		>
			<div className="flex flex-row justify-between">
				<button
					className="flex w-full flex-row justify-between text-left"
					onClick={() => setIsExpanded(!isExpanded)}
				>
					<h1 className="text-[18px] font-bold leading-6">{question}</h1>
					<ArrowIcon
						className={`min-size-7 shrink-0 text-ber-darker-grey hover:text-ber-darker-grey ${isExpanded ? "rotate-90" : "rotate-0"}`}
					/>
				</button>
			</div>

			{isExpanded && <p className="pt-2">{answer}</p>}
		</div>
	);
};
