import React, { useEffect, useState } from "react";
import { CopyIcon } from "../icons/copy-icon";
import { CopiedIcon } from "../icons/copied-icon";

interface CopyToClipboardButtonProps {
	generatedAnswer: string;
}

/**
 * check if the text has indented sections - return original text if not
 * otherwise only copy the indented sections
 */
const checkForIndentedText = (text: string) => {
	if (!text.includes("> ")) {
		return text;
	}

	const lines = text.split("\n");

	const indentedLines = lines.filter((line) => line.startsWith("> "));
	const cleanedIndentedLines = indentedLines.map((line) =>
		line.replace("> ", "").replace(/\*\*/g, ""),
	);

	return cleanedIndentedLines.join("\n");
};

export const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
	generatedAnswer,
}) => {
	const [isCopiedToClipboard, setIsCopiedToClipboard] = useState(false);

	const copyToClipboard = async () => {
		const filteredText = checkForIndentedText(generatedAnswer);
		await navigator.clipboard.writeText(filteredText);
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
