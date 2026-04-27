import { createFileRoute } from "@tanstack/react-router";
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
  return (
    <main className="container space-y-8 p-4">
      <SaleTable />
    </main>
  );
}
