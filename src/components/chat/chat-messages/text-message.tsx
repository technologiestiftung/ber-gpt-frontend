import React from "react";
import ReactMarkdown from "react-markdown";

interface TextMessageProps {
	role: string;
	content: string;
}

export const TextMessage: React.FC<TextMessageProps> = ({ role, content }) => {
	return (
		<div
			className={`max-w-[60%] rounded border-2 p-4 shadow-md ${role === "user" ? "self-end border-mid-grey" : "self-start border-dark-blue"} `}
		>
			<ReactMarkdown className="markdown-container">
				{content === "" ? "..." : content}
			</ReactMarkdown>
		</div>
	);
};
