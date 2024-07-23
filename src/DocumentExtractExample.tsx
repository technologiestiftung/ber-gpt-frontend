import { FormEvent, useState } from "react";

export function DocumentExtractExample() {
	const [extractedText, setExtractedText] = useState("");

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append("file", event.currentTarget.file.files[0]);

		const response = await fetch(
			"https://ber-gpt-backend.onrender.com/documents/extract",
			{
				method: "POST",
				headers: {
					"x-api-key": import.meta.env.VITE_X_API_KEY,
				},
				body: formData,
			},
		);

		if (response.ok) {
			const data = await response.json();
			setExtractedText(data.content);
		} else {
			console.error("Failed to extract text from document");
		}
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className="flex flex-row items-center gap-4"
			>
				<button
					type="submit"
					className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
				>
					Example API Call to /documents/extract
				</button>
				<input type="file" name="file" />
			</form>
			{extractedText && (
				<p className="mt-8 rounded-md bg-green-100 p-2">{extractedText}</p>
			)}
		</div>
	);
}
