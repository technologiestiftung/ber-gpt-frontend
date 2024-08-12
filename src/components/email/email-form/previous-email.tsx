import React from "react";

export const PreviousEmail: React.FC = () => {
	return (
		<>
			<span className="font-bold">E-Mailtext (optional)</span>
			<textarea
				className="flex bg-light-grey w-full h-full focus:outline-none"
				name="previousMail"
				placeholder="Auf welche E-mail soll geantwortet werden?"
				rows={4}
			></textarea>
		</>
	);
};
