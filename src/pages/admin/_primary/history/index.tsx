import { AnalyticsCard } from "@/components/analytics-card";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRightLeft, Banknote } from "lucide-react";

export const Route = createFileRoute("/admin/_primary/history/")({
  component: CollectHistoryPage,
  head: () => ({
    meta: [
      {
        title:
          "Histórico de reciclagem | Recycly - Reciclagem rápida, fácil e eficiente",
      },
    ],
  }),
});

function CollectHistoryPage() {
  return (
    <main className="container space-y-8">
      <article>
        <h1 className="text-primary-green dark:text-white text-4xl font-bold">
          Histórico de reciclagem
        </h1>

        <p className="text-muted-foreground text-lg">
          Acompanhe o histórico de reciclagem de materiais e coleta(s)
          realizadas em sua(s) cooperativa(s).
        </p>
      </article>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnalyticsCard
          title="34.3"
          description="Total reciclado"
          icon={Banknote}
        />

        <AnalyticsCard
          title="25"
          description="Coleta(s) realizada(s)"
          icon={ArrowRightLeft}
        />
      </div>
    </main>
  );
}
