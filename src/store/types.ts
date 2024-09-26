export interface File {
	id: string;
	name: string;
	content: string | null;
	extractionStatus: "pending" | "success" | "error";
}

export type FileMessage = {
	id: string;
	role: string;
	fileName: string;
	type: "file";
	content: string;
	timestamp: string;
	tokenCount: number;
};

export type TextMessage = {
	id: string;
	role: string;
	type: "text";
	content: string;
	timestamp: string;
	tokenCount: number;
};

export type Message = FileMessage | TextMessage;

export interface Chat {
	id: string;
	name: string;
	messages: Message[];
	timestamp: string;
}
