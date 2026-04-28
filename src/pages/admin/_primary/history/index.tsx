import { useCooperativeCollects } from "@/hooks/services/use-collects";
import { createFileRoute } from "@tanstack/react-router";
import { CollectWeightByMaterialChart } from "./~components/-collect-weight-by-material-chart";
import { CollectHistoryTable } from "./~components/-collect-history-table";
import { CollectsOverTimeChart } from "./~components/-collects-over-time-chart";

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
  const { data: collects = [] } = useCooperativeCollects();

  return (
    <main className="container space-y-8 p-4">
      <CollectHistoryTable />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CollectsOverTimeChart collects={collects} />
        <CollectWeightByMaterialChart collects={collects} />
      </div>
    </main>
  );
}
