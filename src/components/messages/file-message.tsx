import React from "react";
import { PDFLargeIcon } from "../icons/pdf-large-icon";

interface FileMessageProps {
	fileName: string;
}

export const FileMessage: React.FC<FileMessageProps> = ({ fileName }) => {
	return (
		<div className="flex w-60 items-center gap-2 self-end rounded-sm bg-ber-lighter-grey px-4 py-3">
			<PDFLargeIcon className={"text-darker-grey"} />
			<div className="flex flex-col">
				<span>{fileName.replace(".pdf", "")}</span>
				<span className="font-light text--grey">PDF</span>
			</div>
		</div>
	);
};
