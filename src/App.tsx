import { SendIcon } from "./components/icons/send-icon";
import { PrimaryButton } from "./components/buttons/primary-button";
import { SecondaryButton } from "./components/buttons/secondary-button";
import { ChatBoxButton } from "./components/buttons/chat-box-button";
import { ChatIcon } from "./components/icons/chat-icon";
import { Historybar } from "./components/historybar/history-bar";

export function App() {
	return (
		<div className="flex flex-row p-4 font-arial">
			<Historybar />
			<div>
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
					ariaLabel="Erkläre mir was ich mit BärGPT machen kann."
				/>
			</div>
		</div>
	);
}
