import { useAuth } from "@/hooks/services/use-auth";
import { createFileRoute } from "@tanstack/react-router";
import { ProfileAchievementsCard } from "./~components/-profile-achievements-card";
import { ProfileHeader } from "./~components/-profile-header";
import { ProfileInfoCard } from "./~components/-profile-info-card";

export const Route = createFileRoute("/admin/_account/profile/")({
  component: ProfilePage,
  head: () => ({
    meta: [
      {
        title: "Perfil | Recycly - Reciclagem rápida, fácil e eficiente",
      },
    ],
  }),
});

function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <main className="container space-y-6">
      <article>
        <h1 className="font-bold text-4xl text-primary-green">
          Informações da conta
        </h1>
        <p className="text-lg text-muted-foreground">
          Confira os dados vinculados à sua conta na plataforma Recycly.
        </p>
      </article>

      <ProfileHeader user={user} />

      <ProfileInfoCard user={user} />

      <ProfileAchievementsCard />
    </main>
  );
}
