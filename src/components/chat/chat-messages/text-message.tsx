import React from "react";
import ReactMarkdown from "react-markdown";
import { BaerIcon } from "../../icons/bear-icon";
import { RefreshIcon } from "../../icons/refresh-icon";
import { CopyToClipboardButton } from "../../buttons/copy-to-clipboard-button";

interface TextMessageProps {
	role: string;
	content: string;
}

export const TextMessage: React.FC<TextMessageProps> = ({ role, content }) => {
	return (
		<div
			className={`max-w-[60%] rounded border-2 p-2 shadow-md ${role === "user" ? "self-end border-mid-grey" : "self-start border-dark-blue"} `}
		>
			<div
				className={`flex flex-row items-center justify-between gap-2 ${role === "assistant" ? "" : "hidden"}`}
			>
				<div
					className={`mb-2 flex min-h-[37px] w-[37px] items-center justify-center rounded-full bg-white drop-shadow-lg`}
				>
					<BaerIcon className="h-[21px] w-[21px]" />
				</div>
				<div className="flex flex-row items-center gap-3 self-start p-2 text-dark-blue">
					<RefreshIcon />
					<CopyToClipboardButton generatedAnswer={content} />
				</div>
			</div>
			<ReactMarkdown className="markdown-container">
				{content === "" ? "..." : content}
			</ReactMarkdown>
		</div>
	);
};
