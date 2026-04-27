import { Button } from "@/components/ui/button";
import {
  useAllCollectionPoints,
  useCollectionPoints,
} from "@/hooks/services/use-collection-points";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { CollectionPointCard } from "./~components/-collection-point-card";
import { CollectionPointMap } from "./~components/-collection-point-map";
import { CreateCollectionPointDialog } from "./~components/-create-collection-point-dialog";

export const Route = createFileRoute("/admin/_primary/collection-points/")({
  component: CollectionPointsPage,
  head: () => ({
    meta: [
      {
        title:
          "Pontos de coleta | Recycly - Reciclagem rápida, fácil e eficiente",
      },
    ],
  }),
});

function CollectionPointsPage() {
  const { data: points = [], isLoading } = useCollectionPoints();
  const { data: allPoints = [] } = useAllCollectionPoints();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  function handleSelectPoint(id: string) {
    setSelectedId(id);
    cardRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  return (
    <>
      <main className="container space-y-8 px-4">
        <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden -m-4">
          <div className="h-64 lg:h-auto lg:flex-1 overflow-hidden rounded-lg">
            <CollectionPointMap
              points={allPoints}
              onSelectPoint={handleSelectPoint}
            />
          </div>

          <div className="flex flex-1 w-full lg:w-115 lg:flex-none flex-col overflow-hidden border-t lg:border-t-0 lg:border-l bg-white dark:bg-secondary-dark">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h1 className="font-bold text-2xl text-primary-green dark:text-white">
                Meus pontos de coleta
              </h1>

              <Button
                className="bg-primary-green p-0 hover:bg-primary-green/90"
                onClick={() => setDialogOpen(true)}
              >
                <Plus className="h-5 w-5" />
                Cadastrar
              </Button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {isLoading && (
                <p className="text-center text-muted-foreground text-sm py-8">
                  Carregando...
                </p>
              )}

              {!isLoading && points.length === 0 && (
                <p className="text-center text-muted-foreground text-sm py-8">
                  Nenhum ponto de coleta cadastrado ainda.
                </p>
              )}

              {points.map((point) => (
                <div
                  key={point.id}
                  ref={(el) => {
                    cardRefs.current[point.id] = el;
                  }}
                >
                  <CollectionPointCard
                    point={point}
                    isSelected={selectedId === point.id}
                    onSelect={() => setSelectedId(point.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <CreateCollectionPointDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
