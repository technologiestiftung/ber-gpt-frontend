import React from "react";
import { useInputFileStore } from "../../store/input-file-store";
import { UploadIcon } from "../icons/upload-icon";

export const FileUploadButton: React.FC = () => {
	const { setFiles } = useInputFileStore();

	return (
		<label
			htmlFor={"file-upload"}
			className="cursor-pointer"
			aria-label={"Datei hochladen"}
			title={"Datei hochladen"}
		>
			<UploadIcon className="text-ber-darker-grey hover:text-ber-dark-grey" />

			<input
				onInput={(e) => setFiles(e.currentTarget.files)}
				className="hidden"
				accept={".pdf"}
				type="file"
				multiple
				id={"file-upload"}
			/>
		</label>
	);
};
