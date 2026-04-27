import { createFileRoute } from "@tanstack/react-router";
import { CollectHistoryTable } from "./~components/-collect-history-table";

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
    <main className="container space-y-8 p-4">
      <CollectHistoryTable />
    </main>
  );
}
