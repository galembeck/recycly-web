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
    <main className="flex flex-col bg-[#F7F7F7] dark:bg-secondary-dark">
      <Navbar />

      <div className="container mx-auto flex h-screen w-full max-w-6xl flex-1 gap-10 px-4 py-8 lg:grid lg:grid-cols-2 lg:px-6.75 xl:px-8">
        <img
          alt="Recycling material(s)"
          className="hidden w-full rounded-[5px] md:flex h-full"
          src="/assets/images/recycling-materials/material-2.png"
        />

        <SignUpForm />
      </div>
    </main>
  );
}
