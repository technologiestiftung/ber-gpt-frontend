import React from "react";

interface PreformattedTextElementProps {
	children?: React.ReactNode;
}

export const PreformattedTextElement: React.FC<
	PreformattedTextElementProps
> = ({ children }) => {
	return (
		<pre className="ml-10 whitespace-pre-wrap w-10/11 my-10">{children}</pre>
	);
};
