import { createFileRoute } from "@tanstack/react-router";
import { AppearanceCard } from "./~components/-appearance-card";
import { DangerZoneCard } from "./~components/-danger-zone-card";
import { NotificationsCard } from "./~components/-notifications-card";

export const Route = createFileRoute("/admin/_account/settings/")({
  component: SettingsPage,
  head: () => ({
    meta: [
      {
        title: "Configurações | Recycly - Reciclagem rápida, fácil e eficiente",
      },
    ],
  }),
});

function SettingsPage() {
  return (
    <main className="container space-y-6">
      <article>
        <h1 className="font-bold text-4xl text-primary-green">Configurações</h1>
        <p className="text-lg text-muted-foreground">
          Personalize sua experiência e gerencie as preferências da sua conta.
        </p>
      </article>

      <AppearanceCard />

      <NotificationsCard />

      <DangerZoneCard />
    </main>
  );
}
