import React from "react";
import { UploadedFiles } from "../uploaded-files";
import { EditChatMessages } from "./edit-chat-messages";
import { EditChatForm } from "./edit-chat-form";

export const Edit: React.FC = () => {
	return (
		<div className="flex h-full flex-col items-center justify-between pt-14 py-5">
			<EditChatMessages />

			<div className="px-5 w-full flex justify-center">
				<div className="md:w-[640px] lg:w-[768px] w-full z-10 flex flex-col bg-ber-lighter-grey">
					<UploadedFiles />

					<EditChatForm />
				</div>
			</div>
		</div>
	);
};
