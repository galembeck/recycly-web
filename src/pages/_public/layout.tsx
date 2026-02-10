import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
	component: PublicLayout,
});

function PublicLayout() {
	return (
		<main className="min-h-screen w-full text-black dark:text-white">
			<div>
				<Outlet />
			</div>
		</main>
	);
}
