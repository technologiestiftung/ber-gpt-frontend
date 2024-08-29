import React from "react";
import { useInputFileStore } from "../../store/input-file-store";
import { SpinnerIcon } from "../icons/spinner-icon";
import { XIcon } from "../icons/x-icon";
import { UploadedPDFIcon } from "../icons/uploaded-pdf-icon";

export const UploadedFiles: React.FC = () => {
	const { files, removeFile } = useInputFileStore();

	return (
		<>
			{files.length > 0 && (
				<div className="flex gap-5 p-4">
					{files.map(({ id, name, extractionStatus }) => (
						<div
							key={id}
							className="flex items-center gap-2 rounded-sm group bg-white p-2"
						>
							<div>
								{extractionStatus === "pending" && <SpinnerIcon />}
								{extractionStatus === "success" && <UploadedPDFIcon />}
							</div>

							<div className="flex flex-col text-xs font-semibold max-w-20 min-w-5">
								<span className="truncate">{name.replace(".pdf", "")}</span>
								<span className="font-light text-ber-light-grey">PDF</span>
							</div>

							{extractionStatus !== "pending" && (
								<div className="relative">
									<button
										onClick={() => removeFile(id)}
										className="flex p-1 items-center justify-center rounded-full bg-ber-light-grey opacity-0 group-hover:opacity-100"
									>
										<XIcon className="size-2 text-ber-darker-grey" />
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
