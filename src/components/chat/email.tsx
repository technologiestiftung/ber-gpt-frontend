import React, { useState } from "react";
import { SendIcon } from "../icons/send-icon.tsx";
import { PrimaryButton } from "../buttons/primary-button.tsx";

const Email: React.FC = () => {
	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const formJson = Object.fromEntries(formData.entries());
		console.log(formJson);
	}

	return (
		<div className="z-10 flex flex-col gap-y-2 rounded border-2 border-mid-grey bg-white px-6 pb-4 pt-6 shadow-md">
			<form
				className={`flex flex-col gap-4 text-sm text-dark-blue`}
				onSubmit={onSubmit}
			>
				<div className="flex h-24 flex-row justify-between gap-4">
					{[
						{
							label: "An wen?",
							name: "recipient",
							options: ["Kolleg:in", "Vorgesetzte", "Kund:in"],
							defaultChecked: "Kolleg:in",
						},
						{
							label: "Umfang",
							name: "scope",
							options: ["kurz", "mittel", "lang"],
							defaultChecked: "short",
						},
						{
							label: "Formulierung",
							name: "formality",
							options: ["formal", "informal"],
							defaultChecked: "formal",
						},
					].map((group) => (
						<div className="flex w-fit flex-col gap-1" key={group.name}>
							<div className="font-semibold">{group.label}</div>
							{group.options.map((option) => (
								<div
									className="flex flex-row justify-between gap-2"
									key={option}
								>
									<label>{option}</label>
									<input
										type="radio"
										name={group.name}
										value={option}
										defaultChecked={group.defaultChecked === option}
									/>
								</div>
							))}
						</div>
					))}
					<div className="flex h-full w-2/5 flex-col gap-2">
						<label className="font-semibold">E-Mail Text (optional)</label>
						<textarea
							className={`h-full resize-none rounded border border-mid-grey p-2 focus:border-blue-500 focus:outline-none`}
							name="subject"
							placeholder="Mail auf die geantwortet werden soll einfügen..."
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<label className="font-semibold">Inhaltliches</label>
					<div
						className={`flex items-center gap-4 rounded border border-dark-blue px-4 py-2 has-[:focus]:border-blue-500`}
					>
						<textarea
							className="w-full resize-none focus:outline-none"
							name="message"
							required
							placeholder="Beschreibe was inhaltlich in der Mail stehen soll..."
						/>
						<PrimaryButton
							label={
								<div className="flex flex-row items-center gap-2">
									<SendIcon />
									Senden
								</div>
							}
							ariaLabel="Nachricht abschicken"
							type={"submit"}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Email;
