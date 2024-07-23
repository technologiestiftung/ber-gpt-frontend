import { ChatExample } from "./ChatExample";

export function App() {
	return (
		<div className="mx-auto flex w-full max-w-[800px] flex-col items-center">
			<h1>BärGPT - KI Testumgebung</h1>
			<ChatExample></ChatExample>
		</div>
	);
}
