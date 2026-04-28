import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCollect } from "@/hooks/services/use-collects";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ArrowLeft,
  Calendar,
  ClipboardList,
  MapPin,
  Package,
  Scale,
  StickyNote,
} from "lucide-react";

export const Route = createFileRoute("/admin/_primary/history/$collectId/")({
  component: CollectDetailPage,
  head: () => ({
    meta: [
      {
        title:
          "Detalhes da Coleta | Recycly - Reciclagem rápida, fácil e eficiente",
      },
    ],
  }),
});

function CollectDetailPage() {
  const { collectId } = Route.useParams();
  const navigate = useNavigate();
  const { data: collect, isLoading } = useCollect(collectId);

  if (isLoading) {
    return (
      <main className="container p-4">
        <div className="flex h-64 items-center justify-center text-muted-foreground">
          Carregando...
        </div>
      </main>
    );
  }

  if (!collect) {
    return (
      <main className="container p-4">
        <div className="flex h-64 flex-col items-center justify-center gap-2 text-muted-foreground">
          <p className="text-lg font-medium">Coleta não encontrada.</p>
          <button
            className="text-sm text-primary-green underline"
            onClick={() => navigate({ to: "/admin/history" })}
          >
            Voltar ao histórico
          </button>
        </div>
      </main>
    );
  }

  const formattedDate = format(
    new Date(collect.collectedAt),
    "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
    { locale: ptBR },
  );

  const formattedCreatedAt = format(
    new Date(collect.createdAt),
    "dd/MM/yyyy 'às' HH:mm",
    { locale: ptBR },
  );

  return (
    <main className="container space-y-6 p-4">
      <div className="flex gap-4">
        <button
          onClick={() => navigate({ to: "/admin/history" })}
          className="mt-1 flex h-8 w-8 cursor-pointer shrink-0 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <div className="flex flex-col lg:flex-row gap-2 w-full items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-primary-green">
              Detalhes da Coleta
            </h1>

            <p className="text-muted-foreground">
              Registrada em {formattedCreatedAt}
            </p>
          </div>

          <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
            {collect.id}
          </span>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1.5">
              <Scale className="h-3.5 w-3.5" />
              Peso coletado
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              {Number(collect.weightKg).toFixed(3)}{" "}
              <span className="text-base font-normal text-muted-foreground">
                kg
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Data da coleta
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-sm font-semibold leading-snug">
              {formattedDate}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1.5">
              <Package className="h-3.5 w-3.5" />
              Material
            </CardDescription>
          </CardHeader>

          <CardContent>
            {collect.material ? (
              <Badge
                variant="outline"
                className="gap-1.5 text-sm"
                style={{
                  borderColor: collect.material.color,
                  color: collect.material.color,
                }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: collect.material.color }}
                />
                {collect.material.name}
              </Badge>
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              Ponto de coleta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-semibold leading-snug">
              {collect.collectionPointName ?? (
                <span className="text-muted-foreground">—</span>
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ClipboardList className="h-4 w-4" />
            Informações do registro
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-muted-foreground">
              ID completo
            </span>
            <span className="break-all font-mono text-xs">{collect.id}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-muted-foreground">
              ID do ponto de coleta
            </span>
            <span className="break-all font-mono text-xs">
              {collect.collectionPointId}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-muted-foreground">
              ID do material
            </span>
            <span className="break-all font-mono text-xs">
              {collect.materialId}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-muted-foreground">
              Registrado em
            </span>
            <span>{formattedCreatedAt}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <StickyNote className="h-4 w-4" />
            Observações
          </CardTitle>
        </CardHeader>
        <CardContent>
          {collect.notes ? (
            <p className="text-sm leading-relaxed">{collect.notes}</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Nenhuma observação registrada.
            </p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
