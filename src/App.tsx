import { SendIcon } from "./components/icons/send-icon";
import { PrimaryButton } from "./components/buttons/primary";
import { SecondaryButton } from "./components/buttons/secondary";
import { ChatBoxButton } from "./components/buttons/chat-box";
import { ChatIcon } from "./components/icons/chat-icon";

export function App() {
	return (
		<div className="p-4 font-arial">
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
			<ChatBoxButton
				icon={<ChatIcon />}
				label={
					<div>
						Erkläre mir was ich mit <b>BärGPT</b> machen kann.
					</div>
				}
				ariaLabel="Nachricht abschicken"
			/>
		</div>
	);
}
