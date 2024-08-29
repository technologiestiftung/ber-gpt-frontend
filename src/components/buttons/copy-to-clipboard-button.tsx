import React, { useEffect, useState } from "react";
import { CopyIcon } from "../icons/copy-icon";
import { CopiedIcon } from "../icons/copied-icon";

interface CopyToClipboardButtonProps {
	generatedAnswer: string;
}

export const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
	generatedAnswer,
}) => {
	const [isCopiedToClipboard, setIsCopiedToClipboard] = useState(false);

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(generatedAnswer);
		setIsCopiedToClipboard(true);
	};

	/**
	 * Reset icon after 2 seconds
	 */
	useEffect(() => {
		const timeoutId = setTimeout(() => setIsCopiedToClipboard(false), 2000);

		return () => clearTimeout(timeoutId);
	}, [isCopiedToClipboard]);

	return (
		<button
			className="text-ber-darker-grey hover:text-ber-dark-grey"
			onClick={copyToClipboard}
			aria-label={isCopiedToClipboard ? "Kopiert!" : "Kopieren"}
			title={isCopiedToClipboard ? "Kopiert!" : "Kopieren"}
		>
			{isCopiedToClipboard ? <CopiedIcon /> : <CopyIcon />}
		</button>
	);
};
