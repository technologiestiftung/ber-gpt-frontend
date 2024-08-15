import React from "react";

export const PreviousEmail: React.FC = () => {
	return (
		<>
			<span className="font-bold">E-Mail Text (optional)</span>
			<textarea
				className="flex bg-ber-lighter-grey w-full h-full max-h-72 focus:outline-none"
				name="previousMail"
				placeholder="Auf welche E-mail soll geantwortet werden?"
				rows={4}
			></textarea>
		</>
	);
};
