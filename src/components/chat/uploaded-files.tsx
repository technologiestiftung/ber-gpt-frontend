import React from "react";
import { useInputFileStore } from "../../store/input-file-store";
import { SpinnerIcon } from "../icons/spinner-icon";
import { PDFLargeIcon } from "../icons/pdf-large-icon";
import { XIcon } from "../icons/x-icon";

export const UploadedFiles: React.FC = () => {
	const { files, removeFile } = useInputFileStore();

	return (
		<div className="flex gap-5">
			{files.map(({ id, name, extractionStatus }) => (
				<div
					key={id}
					className="flex items-center gap-2 rounded border border-gray-300 px-4 py-3 shadow-md"
				>
					{extractionStatus === "pending" && <SpinnerIcon />}
					{extractionStatus === "error" && "❌"}
					{extractionStatus === "success" && <PDFLargeIcon />}

					<div className="flex flex-col">
						<span>{name.replace(".pdf", "")}</span>
						<span className="font-light text-gray-300">PDF</span>
					</div>

					{extractionStatus !== "pending" && (
						<div className="relative">
							<button
								onClick={() => removeFile(id)}
								className="absolute -right-7 -top-11 flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200"
							>
								<XIcon />
							</button>
						</div>
					)}
				</div>
			))}
		</div>
	);
};