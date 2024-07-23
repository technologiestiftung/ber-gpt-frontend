import { ChatExample } from "./ChatExample";
import { DocumentExtractExample } from "./DocumentExtractExample";

export function App() {
	return (
		<div className="items-left mx-auto flex w-full max-w-[800px] flex-col gap-8">
			<h1>BärGPT - KI Testumgebung</h1>
			<ChatExample></ChatExample>
			<DocumentExtractExample></DocumentExtractExample>
		</div>
	);
}
