import React from "react";

interface PreElementProps {
	children?: React.ReactNode;
}

export const PreElement: React.FC<PreElementProps> = ({ children }) => {
	return (
		<pre className="ml-10 whitespace-pre-wrap w-10/11 my-10">{children}</pre>
	);
};
