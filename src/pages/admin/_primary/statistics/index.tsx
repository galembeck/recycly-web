import { createFileRoute } from "@tanstack/react-router";
import { useStatistics } from "@/hooks/services/use-statistics";
import { MonthlyKgChart } from "./~components/-monthly-kg-chart";
import { MaterialDistributionChart } from "./~components/-material-distribution-chart";
import { WeeklyActivityChart } from "./~components/-weekly-activity-chart";
import { AchievementsCard } from "./~components/-achievements-card";

export const Route = createFileRoute("/admin/_primary/statistics/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Estatísticas | Recycly - Reciclagem rápida, fácil e eficiente",
      },
    ],
  }),
});

function RouteComponent() {
  const { data: stats } = useStatistics();

  return (
    <main className="container space-y-8">
      <article>
        <h2 className="text-primary-green font-bold text-4xl">Estatísticas</h2>
        <p className="text-lg">
          Visualize seu progresso e atividades de reciclagem de sua(s)
          cooperativa(s).
        </p>
      </article>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <MonthlyKgChart data={stats?.monthlyKg ?? []} />
        <MaterialDistributionChart data={stats?.materialDistribution ?? []} />
        <WeeklyActivityChart data={stats?.weeklyActivity ?? []} />
        <AchievementsCard achievements={stats?.achievements ?? []} />
      </div>
    </main>
  );
}
