import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/services/use-auth";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRightLeft, Banknote, MapPin } from "lucide-react";
import { ChartAreaInteractive } from "./~components/-chart-area-interactive";
import { RecycledMaterialsCard } from "./~components/-recycled-materials-card";
import { UnderDevelopmentAdvice } from "./~components/-under-development-advice";
import { TransactionsOverview } from "./~components/analytics-information/-transactions-overview";
import { CollectionPointCard } from "../_primary/collection-points/~components/-collection-point-card";
import { useCollectionPoints } from "@/hooks/services/use-collection-points";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/admin/dashboard/")({
  component: DashboardPage,
  head: () => ({
    meta: [
      { title: "Visão Geral | Recycly - Reciclagem rápida, fácil e eficiente" },
    ],
  }),
});

function DashboardPage() {
  const { user } = useAuth();

  const { data: points = [] } = useCollectionPoints();

  return (
    <main className="container space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <article>
          <h2 className="text-primary-green font-bold text-4xl">
            Olá, {user?.name?.split(" ")[0]}!
          </h2>

          <p>
            Aqui está um resumo das atividades em sua(s) cooperativa(s) de
            reciclagem registradas em nossa plataforma.
          </p>
        </article>

        <UnderDevelopmentAdvice />
      </div>

      <TransactionsOverview />

      <Tabs defaultValue="history">
        <TabsList>
          <TabsTrigger value="history">
            <ArrowRightLeft />
            Coletas
          </TabsTrigger>

          <TabsTrigger value="sales">
            <Banknote />
            Vendas
          </TabsTrigger>

          <TabsTrigger value="collection-points">
            <MapPin />
            Pontos de coleta
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          {/*<OrdersTable layout="summary" />*/}
        </TabsContent>

        <TabsContent value="sales">{/*<ClientsTable />*/}</TabsContent>

        <TabsContent value="collection-points">
          <Card className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 px-4">
            {points.map((point) => (
              <CollectionPointCard key={point.id} point={point} />
            ))}
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex w-full flex-col gap-4 xl:flex-row">
        <RecycledMaterialsCard />

        <ChartAreaInteractive />
      </div>
    </main>
  );
}
