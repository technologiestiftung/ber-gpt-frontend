import React from "react";
import { useInputFileStore } from "../../store/input-file-store";
import { SpinnerIcon } from "../icons/spinner-icon";
import { PDFLargeIcon } from "../icons/pdf-large-icon";
import { XIcon } from "../icons/x-icon";

export const UploadedFiles: React.FC = () => {
	const { files, removeFile } = useInputFileStore();

	return (
		<>
			{files.length > 0 && (
				<div className="flex gap-5 p-4">
					{files.map(({ id, name, extractionStatus }) => (
						<div
							key={id}
							className="flex items-center gap-4 rounded-sm border border-ber-light-grey bg-white px-4 py-3"
						>
							{extractionStatus === "pending" && <SpinnerIcon />}
							{extractionStatus === "error" && "❌"}
							{extractionStatus === "success" && (
								<PDFLargeIcon className="text-ber-darker-grey" />
							)}

							<div className="flex flex-col">
								<span>{name.replace(".pdf", "")}</span>
								<span className="font-light text-ber-light-grey">PDF</span>
							</div>

							{extractionStatus !== "pending" && (
								<div className="relative">
									<button
										onClick={() => removeFile(id)}
										className="absolute -right-7 -top-11 flex h-6 w-6 items-center justify-center rounded-full border border-ber-dark-grey bg-gray-100 hover:bg-gray-200"
									>
										<XIcon className="h-2.5 w-2.5 text-ber-dark-grey" />
									</button>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</>
	);
};