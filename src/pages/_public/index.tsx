import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/")({
	component: HomePage,
	head: () => ({
		meta: [
			{
				title: "Recycly | Reciclagem rápida, fácil e eficiente",
			},
		],
	}),
});

function HomePage() {
	return (
		<main>
			<h1>Recycly</h1>
		</main>
	);
}
