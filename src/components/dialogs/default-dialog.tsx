import React, { useEffect, useRef } from "react";
import { XIcon } from "../icons/x-icon";

interface DefaultDialogProps {
	children?: React.ReactNode;
	className?: string;
	id?: string;
	afterClose?: () => void;
	isOpen?: boolean;
}

export const DefaultDialog: React.FC<DefaultDialogProps> = ({
	children,
	className,
	id,
	afterClose,
	isOpen,
}) => {
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickListener);

		return () => {
			document.removeEventListener("mousedown", handleClickListener);
		};
	}, []);

	const handleClickListener = (event: MouseEvent) => {
		if (!dialogRef.current) {
			return;
		}

		/**
		 * This is confusing, yet correct. The dialog element spreads over the whole screen.
		 * If the user clicks on something inside the dialog, the event target won't be the dialog itself.
		 */
		const isClickOnDialogBackground = event.target === dialogRef.current;

		if (!isClickOnDialogBackground) {
			return;
		}

		closeDialog();
	};

	const closeDialog = () => {
		dialogRef.current?.close();
		afterClose?.();
	};

	return (
		<>
			<dialog open={isOpen} ref={dialogRef} id={id} className={className}>
				{children}
				<button
					className="text-ber-darker-grey absolute right-4 top-4 pb-2 hover:text-ber-dark-grey"
					onClick={closeDialog}
				>
					<XIcon className="size-6" />
				</button>
			</dialog>
		</>
	);
};
