import { createFileRoute } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import { FeaturesSection } from "./~components/-features-section";
import { HowItWorksSection } from "./~components/-how-it-works-section";
import { ImpactsSection } from "./~components/-impacts-section";
import { IntroSection } from "./~components/-intro-section";
import { SustainabilitySection } from "./~components/-sustainability-section";

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
    <main className="flex flex-col gap-18">
      <IntroSection />

      <Separator
        className="bg-gray-300! dark:bg-muted-foreground/30!"
        orientation="horizontal"
      />

      <HowItWorksSection />

      <Separator
        className="bg-gray-300! dark:bg-muted-foreground/30!"
        orientation="horizontal"
      />

      <FeaturesSection />

      <Separator
        className="bg-gray-300! dark:bg-muted-foreground/30!"
        orientation="horizontal"
      />

      <ImpactsSection />

      <Separator
        className="bg-gray-300! dark:bg-muted-foreground/30!"
        orientation="horizontal"
      />

      <SustainabilitySection />

      <Separator
        className="bg-gray-300! dark:bg-muted-foreground/30!"
        orientation="horizontal"
      />
    </main>
  );
}
