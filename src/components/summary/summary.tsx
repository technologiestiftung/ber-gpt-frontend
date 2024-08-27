import React from "react";
import { UploadedFiles } from "./uploaded-files";
import { SummaryChatMessages } from "./summary-chat-messages";
import { SummaryChatForm } from "./summary-chat-form/summary-chat-form";

export const Summary: React.FC = () => {
	return (
		<div className="flex h-full flex-col items-center justify-between pt-14 py-5">
			<SummaryChatMessages />

			<div className="px-5 w-full flex justify-center">
				<div className="md:w-[640px] lg:w-[768px] w-full z-10 flex flex-col bg-ber-lighter-grey">
					<UploadedFiles />

					<SummaryChatForm />
				</div>
			</div>
		</div>
	);
};
