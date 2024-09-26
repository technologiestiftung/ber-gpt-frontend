import React from "react";

interface CapacityErrorProps {
	tokenCapacity: number;
}
export const CapacityError: React.FC<CapacityErrorProps> = ({
	tokenCapacity,
}) => {
	return (
		<div className="md:w-[640px] lg:w-[768px] w-full flex flex-row gap-4 rounded-sm border-4 border-ber-orange bg-white px-6 py-3 text-sm text-ber-darker-grey shadow-md mb-2 items-center">
			<div className="w-full flex justify-center">
				Die maximale Länge dieser Konversation ist {tokenCapacity < 1 && "bald"}{" "}
				erreicht.
				<a href="/" className="mx-1 underline">
					Bitte starten Sie einen neuen Chat.
				</a>
			</div>
		</div>
	);
};
