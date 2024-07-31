import { useEffect, useState } from "react";
import { CopyIcon } from "../icons/copy-icon";
import { CheckIcon } from "../icons/check-icon";

export function CopyToClipboardButton({
	generatedAnswer,
}: {
	generatedAnswer: string;
}) {
	const [isCopiedToClipboard, setIsCopiedToClipboard] = useState(false);

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(generatedAnswer);
		setIsCopiedToClipboard(true);
	};

	/**
	 * reset icon after 2 seconds
	 */
	useEffect(() => {
		const timeoutId = setTimeout(() => setIsCopiedToClipboard(false), 2000);

		return () => clearTimeout(timeoutId);
	}, [isCopiedToClipboard]);

	return (
		<div>
			<button
				className={`hover:text-mid-blue text-dark-blue`}
				onClick={copyToClipboard}
				aria-label={isCopiedToClipboard ? "Kopiert!" : "Kopieren"}
				title={isCopiedToClipboard ? "Kopiert!" : "Kopieren"}
			>
				{isCopiedToClipboard ? <CheckIcon /> : <CopyIcon />}
			</button>
		</div>
	);
}
