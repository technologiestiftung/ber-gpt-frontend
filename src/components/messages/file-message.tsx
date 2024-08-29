import React from "react";
import { UploadedPDFIcon } from "../icons/uploaded-pdf-icon";

interface FileMessageProps {
	fileName: string;
}

export const FileMessage: React.FC<FileMessageProps> = ({ fileName }) => {
	return (
		<div className="flex  items-center gap-2 self-end rounded-sm bg-ber-lighter-grey px-4 py-3">
			<UploadedPDFIcon />
			<div className="flex flex-col text-xs font-semibold max-w-40 min-w-5">
				<span className="truncate">{fileName.replace(".pdf", "")}</span>
				<span className="font-light text-ber-light-grey">PDF</span>
			</div>
		</div>
	);
};
