import React from "react";
import { useErrorStore } from "../store/error-store";
import { XIcon } from "./icons/x-icon";
import { ErrorIcon } from "./icons/error-icon";

interface ErrorToastProps {
	error: string;
}
export const ErrorToast: React.FC<ErrorToastProps> = ({ error }) => {
	const clearErrors = useErrorStore().clearErrors;
	return (
		<div className="absolute bottom-5 left-0 right-0 z-[1000000] px-4 text-sm md:bottom-10 md:text-lg">
			<div className="relative flex w-full flex-row justify-center">
				<div className="flex w-fit flex-row items-center justify-between gap-4 rounded border-4 border-orange bg-white px-6 py-4 text-[16px] font-semibold text-darker-grey shadow-md">
					<ErrorIcon />
					{error}
					<button className="pl-8" onClick={clearErrors}>
						<XIcon />
					</button>
				</div>
			</div>
		</div>
	);
};
