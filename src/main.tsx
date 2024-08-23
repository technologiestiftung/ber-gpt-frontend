import React from "react";
import ReactDOM from "react-dom/client";
import { Index } from "./routes";
import { Email } from "./routes/email";
import { Note } from "./routes/note";
import { Summary } from "./routes/summary";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { EmailChat } from "./routes/email-chat";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Index />,
	},
	{
		path: "/email",
		element: <Email />,
	},
	{
		path: "/email-chat",
		element: <EmailChat />,
	},
	{
		path: "/summary",
		element: <Summary />,
	},
	{
		path: "/note",
		element: <Note />,
	},
]);

function render() {
	const root = document.getElementById("root");

	if (!root) {
		return;
	}

	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>,
	);
}

render();
