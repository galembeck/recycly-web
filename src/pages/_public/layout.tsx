import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const Route = createFileRoute("/_public")({
	component: PublicLayout,
});

function PublicLayout() {
	return (
		<main className="min-h-screen w-full bg-[#F7F7F7] text-black dark:text-white">
			<Navbar />

			<div>
				<Outlet />
			</div>

			<Footer />
		</main>
	);
}
