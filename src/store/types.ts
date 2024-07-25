export interface Message {
	id: string;
	role: string;
	content: string;
	timestamp: string;
}

export interface Chat {
	id: string;
	name: string;
	messages: Message[];
	timestamp: string;
}
