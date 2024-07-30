import React from "react";
import { PDFLargeIcon } from "../../icons/pdf-large-icon";

interface FileMessageProps {
	fileName: string;
}

export const FileMessage: React.FC<FileMessageProps> = ({ fileName }) => {
	return (
		<div className="flex w-60 items-center gap-2 self-end rounded border border-gray-300 px-4 py-3 shadow-lg">
			<PDFLargeIcon />
			<div className="flex flex-col">
				<span>{fileName.replace(".pdf", "")}</span>
				<span className="font-light text-gray-300">PDF</span>
			</div>
		</div>
	);
};
