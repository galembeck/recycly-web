import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { SignInForm } from "./~components/-sign-in-form";

export const Route = createFileRoute("/_auth/sign-in/")({
  component: SignInPage,
  head: () => ({
    meta: [
      { title: "Entrar | Recycly - Reciclagem rápida, fácil e eficiente" },
    ],
  }),
});

function SignInPage() {
  return (
    <main className="flex h-screen flex-col bg-[#F7F7F7] dark:bg-secondary-dark">
      <Navbar />

      <div className="container mx-auto flex w-full max-w-6xl flex-1 gap-10 px-4 py-8 md:grid md:grid-cols-2 md:px-6.75 lg:px-8">
        <SignInForm />

        {/** biome-ignore lint/correctness/useImageSize: not required by @TailwindCSS */}
        <img
          alt="Recyling material(s)"
          className="hidden h-full w-full rounded-[5px] md:flex"
          src="/assets/images/recycling-materials/material-1.png"
        />
      </div>
    </main>
  );
}
