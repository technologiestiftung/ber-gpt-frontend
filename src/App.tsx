import { SendIcon } from "./components/buttons/icons/send-icon";
import { PrimaryButton } from "./components/buttons/primary";
import { SecondaryButton } from "./components/buttons/secondary";

export function App() {
	return (
		<div className="font-arial p-4">
			<h1 aria-label="button">BärGPT - KI Testumgebung</h1>
			<PrimaryButton
				label={
					<div className="flex flex-row items-center gap-2">
						<SendIcon />
						Senden
					</div>
				}
				ariaLabel="Nachricht abschicken"
			/>
			<SecondaryButton label="E–Mail Hilfe" ariaLabel="E–Mail Hilfe" />
		</div>
	);
}
