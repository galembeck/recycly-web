import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSale } from "@/hooks/services/use-sales";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ArrowLeft,
  Calendar,
  ClipboardList,
  Package,
  Scale,
  StickyNote,
  User,
  Wallet,
} from "lucide-react";

export const Route = createFileRoute("/admin/_primary/sales/$saleId/")({
  component: SaleDetailPage,
  head: () => ({
    meta: [
      {
        title:
          "Detalhes da Venda | Recycly - Reciclagem rápida, fácil e eficiente",
      },
    ],
  }),
});

const formatBRL = (n: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(n);

function SaleDetailPage() {
  const { saleId } = Route.useParams();
  const navigate = useNavigate();
  const { data: sale, isLoading } = useSale(saleId);

  if (isLoading) {
    return (
      <main className="container p-4">
        <div className="flex h-64 items-center justify-center text-muted-foreground">
          Carregando...
        </div>
      </main>
    );
  }

  if (!sale) {
    return (
      <main className="container p-4">
        <div className="flex h-64 flex-col items-center justify-center gap-2 text-muted-foreground">
          <p className="text-lg font-medium">Venda não encontrada.</p>
          <button
            className="text-sm text-primary-green underline"
            onClick={() => navigate({ to: "/admin/sales" })}
          >
            Voltar às vendas
          </button>
        </div>
      </main>
    );
  }

  const formattedDate = format(
    new Date(sale.soldAt),
    "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
    { locale: ptBR },
  );

  const formattedCreatedAt = format(
    new Date(sale.createdAt),
    "dd/MM/yyyy 'às' HH:mm",
    { locale: ptBR },
  );

  return (
    <main className="container space-y-6 p-4">
      {/* Header */}
      <div className="flex items-start gap-4">
        <button
          onClick={() => navigate({ to: "/admin/sales" })}
          className="mt-1 flex cursor-pointer h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <div className="flex flex-col lg:flex-row gap-2 w-full items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-primary-green">
              Detalhes da Venda
            </h1>

            <p className="text-muted-foreground">
              Registrada em {formattedCreatedAt}
            </p>
          </div>

          <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
            {sale.id}
          </span>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              Comprador
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-semibold leading-snug">
              {sale.buyerName}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1.5">
              <Wallet className="h-3.5 w-3.5" />
              Valor total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary-green">
              {formatBRL(Number(sale.price))}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1.5">
              <Scale className="h-3.5 w-3.5" />
              Peso total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {Number(sale.weightKg).toFixed(3)}{" "}
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
              Data da venda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-semibold leading-snug">
              {formattedDate}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-4 w-4" />
            Materiais vendidos
          </CardTitle>
          <CardDescription>
            {sale.materials.length} material
            {sale.materials.length !== 1 ? "is" : ""} nesta venda
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sale.materials.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {sale.materials.map((m) => (
                <Badge
                  key={m.id}
                  variant="outline"
                  className="gap-1.5 px-3 py-1 text-sm"
                  style={{ borderColor: m.color, color: m.color }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: m.color }}
                  />
                  {m.name}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Nenhum material associado.
            </p>
          )}
        </CardContent>
      </Card>

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
            <span className="break-all font-mono text-xs">{sale.id}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-muted-foreground">
              ID da cooperativa
            </span>
            <span className="break-all font-mono text-xs">
              {sale.cooperativeId}
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
          {sale.notes ? (
            <p className="text-sm leading-relaxed">{sale.notes}</p>
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
