import React from "react";
import { qas } from "./qas";
import { Collapsible } from "../collapse/collapsible";
import { QuestionMarkIcon } from "../icons/question-mark-icon";
import { XIcon } from "../icons/x-icon";

export const Help: React.FC = () => {
	const [isHelpOpen, setIsHelpOpen] = React.useState(false);

	return (
		<>
			<div
				className={`
					absolute right-5 md:right-12 top-[4.25rem] md:top-[4.25rem]
				`}
			>
				<button
					className={`
						flex items-center gap-x-2.5
						bg-ber-darker-grey hover:bg-ber-dark-grey
						p-1.5 md:p-2.5 rounded-sm
						text-white text-sm md:text-lg
					`}
					style={{ lineHeight: 1 }}
					onClick={() => setIsHelpOpen(!isHelpOpen)}
				>
					<QuestionMarkIcon />
					Hilfe
				</button>
			</div>

			{isHelpOpen && (
				<div
					className={`
						absolute right-0 top-12 md:right-12 md:top-20 z-50 
						md:w-96 w-full md:h-[36rem] h-full
						border border-ber-lighter-grey shadow-2xl
						text-ber-darker-grey text-[16px]
						p-5 bg-white rounded-sm overflow-y-auto 
					`}
				>
					<div className="flex justify-between pb-4">
						<span className="text-3xl">Hilfe</span>
						<button onClick={() => setIsHelpOpen(false)}>
							<XIcon className="size-6 hover:text-ber-dark-grey" />
						</button>
					</div>
					<div className="flex flex-col gap-y-2">
						{qas.map((qa) => (
							<Collapsible
								key={qa.question}
								question={qa.question}
								answer={qa.answer}
								openByDefault={qa.openByDefault}
							/>
						))}
					</div>
				</div>
			)}
		</>
	);
};
