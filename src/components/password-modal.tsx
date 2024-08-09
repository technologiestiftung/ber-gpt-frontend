import React from "react";

import { useIsLockedStore } from "../store/is-locked-store";
import { PrimaryButton } from "./buttons/primary-button";
import { useErrorStore } from "../store/error-store";
import { BaerIcon } from "./icons/bear-icon";

export const PasswordModal: React.FC = () => {
	const { isLocked, unlock } = useIsLockedStore();
	const { handleError } = useErrorStore();

	const p = "vorschau";

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const password = (e.currentTarget.elements[0] as HTMLInputElement).value;

		if (password !== p) {
			handleError(new Error("wrong_password"));
			return;
		}

		unlock();
	};

	return (
		<>
			<dialog open={isLocked} className="w-svw">
				<form className="flex w-full justify-center mt-20" onSubmit={onSubmit}>
					<div className="flex flex-col w-[20.5rem] gap-y-2 border border-zinc-300 rounded p-7 shadow-md">
						<div className="rounded-full bg-white drop-shadow-md w-fit p-2 self-center">
							<BaerIcon />
						</div>
						<h1 className="self-center font-bold text-2xl mt-3.5">BärGPT</h1>
						<h2 className="self-center text-2xl -mt-3">KI-Testumgebung</h2>

						<label htmlFor="password" className="font-bold mt-12">
							Passwort
						</label>
						<input
							type="password"
							id="password"
							className="bg-neutral-100 p-2 rounded-sm"
						/>
						<PrimaryButton
							type="submit"
							label="Anmelden"
							className="self-center mt-12"
						/>
					</div>
				</form>
			</dialog>
		</>
	);
};
