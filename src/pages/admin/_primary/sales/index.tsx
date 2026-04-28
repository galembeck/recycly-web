import { useSales } from "@/hooks/services/use-sales";
import { createFileRoute } from "@tanstack/react-router";
import { RevenueByBuyerChart } from "./~components/-revenue-by-buyer-chart";
import { RevenueOverTimeChart } from "./~components/-revenue-over-time-chart";
import { SaleTable } from "./~components/-sale-table";

export const Route = createFileRoute("/admin/_primary/sales/")({
  component: SalesPage,
  head: () => ({
    meta: [
      {
        title: "Vendas | Recycly - Reciclagem rápida, fácil e eficiente",
      },
    ],
  }),
});

function SalesPage() {
  const { data: sales = [] } = useSales();

  return (
    <main className="container space-y-8 p-4">
      <SaleTable />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueOverTimeChart sales={sales} />
        <RevenueByBuyerChart sales={sales} />
      </div>
    </main>
  );
}
