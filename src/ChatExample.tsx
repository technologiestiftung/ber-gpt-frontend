import { useState } from "react";

export function ChatExample() {
	const [chatMessage, setChatMessage] = useState("");

	async function streamToString(body: ReadableStream<Uint8Array>) {
		setChatMessage("");
		const reader = body?.pipeThrough(new TextDecoderStream()).getReader();
		while (reader) {
			const stream = await reader.read();
			if (stream.done) {
				break;
			}
			const chunks = stream.value
				.toString()
				.replace(/^data: /gm, "")
				.split("\n")
				.filter((c: string) => Boolean(c.length) && c !== "[DONE]")
				.map((c: string) => JSON.parse(c));
			if (chunks) {
				for (const chunk of chunks) {
					const content = chunk.choices[0].delta.content;
					if (!content) {
						continue;
					}
					setChatMessage((prev) => prev + content);
				}
			}
		}
	}

	return (
		<div>
			<button
				className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
				onClick={async () => {
					setChatMessage("");
					try {
						const response = await fetch(
							`https://ber-gpt-backend.onrender.com/chat`,
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
									"x-api-key": import.meta.env.VITE_X_API_KEY,
									llm: "azure",
								},
								body: JSON.stringify({
									messages: [
										{
											role: "user",
											content: "Wer bist du? Antworte ausführlich.",
										},
									],
								}),
							},
						);

						if (!response.body) {
							throw new Error("Response body is empty");
						}
						streamToString(response.body);
					} catch (err) {
						console.error(err);
					}
				}}
			>
				Example API Call to /chat
			</button>
			{chatMessage && (
				<p className="mt-8 rounded-md bg-red-100 p-2">{chatMessage}</p>
			)}
		</div>
	);
}
