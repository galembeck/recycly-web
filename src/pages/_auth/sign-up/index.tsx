import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { SignUpForm } from "./~components/-sign-up-form";

export const Route = createFileRoute("/_auth/sign-up/")({
	component: SignUpPage,
	head: () => ({
		meta: [
			{ title: "Cadastrar | Recycly - Reciclagem rápida, fácil e eficiente" },
		],
	}),
});

function SignUpPage() {
	return (
		<main className="flex flex-col bg-[#F7F7F7]">
			<Navbar />

			<div className="container mx-auto flex h-screen w-full max-w-6xl flex-1 gap-10 px-4 py-8 md:grid md:grid-cols-2 md:px-6.75 lg:px-8">
				<div className="hidden h-full w-full rounded-[5px] bg-primary-green md:flex" />

				<SignUpForm />
			</div>
		</main>
	);
}
