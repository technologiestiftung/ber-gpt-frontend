import React from "react";

interface PreformattedTextElementProps {
	children?: React.ReactNode;
}

export const PreformattedTextElement: React.FC<
	PreformattedTextElementProps
> = ({ children }) => {
	return (
		<pre className="ml-3 whitespace-pre-line  w-full my-4">{children}</pre>
	);
};
