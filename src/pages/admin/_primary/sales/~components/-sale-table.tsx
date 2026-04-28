/* eslint-disable react-hooks/rules-of-hooks */
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteSale, useSales } from "@/hooks/services/use-sales";
import type { Sale } from "@/types/sale";
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { exportSalesPDF } from "@/utils/export-pdf";
import {
  Copy,
  FileDown,
  MoreHorizontal,
  Plus,
  ScanSearch,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CreateSaleDialog } from "./-create-sale-dialog";

// eslint-disable-next-line react-refresh/only-export-components
export const saleColumns: ColumnDef<Sale>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {(row.getValue("id") as string).slice(0, 8)}...
      </span>
    ),
  },
  {
    accessorKey: "buyerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comprador" />
    ),
  },
  {
    accessorKey: "materials",
    header: "Materiais",
    cell: ({ row }) => {
      const sale = row.original;
      return (
        <div className="flex flex-wrap gap-1">
          {sale.materials.map((m) => (
            <Badge
              key={m.id}
              variant="outline"
              className="gap-1 text-xs"
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
      );
    },
  },
  {
    accessorKey: "weightKg",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Peso (kg)" />
    ),
    cell: ({ row }) => (
      <span>{Number(row.getValue("weightKg")).toFixed(3)} kg</span>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor" />
    ),
    cell: ({ row }) => (
      <span>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(row.getValue("price")))}
      </span>
    ),
  },
  {
    accessorKey: "soldAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data da venda" />
    ),
    cell: ({ row }) => (
      <span>
        {format(new Date(row.getValue("soldAt")), "dd/MM/yyyy HH:mm", {
          locale: ptBR,
        })}
      </span>
    ),
  },
  {
    accessorKey: "notes",
    header: "Observações",
    cell: ({ row }) => {
      const notes = row.getValue("notes") as string | null;
      if (!notes) return <span className="text-muted-foreground">—</span>;
      return (
        <span title={notes}>
          {notes.length > 40 ? `${notes.slice(0, 40)}...` : notes}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <span className="flex justify-center">Ações</span>,
    cell: ({ row }) => {
      const sale = row.original;
      const { mutate: deleteSale } = useDeleteSale();
      const navigate = useNavigate();
      const [confirmOpen, setConfirmOpen] = useState(false);

      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Opções</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigate({
                    to: "/admin/sales/$saleId",
                    params: { saleId: sale.id },
                  })
                }
              >
                <ScanSearch />
                Ver detalhes
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(sale.id);
                  toast.success("ID copiado!");
                }}
              >
                <Copy />
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setConfirmOpen(true);
                }}
              >
                <Trash2 className="text-red-500" />
                <span className="text-red-500">Excluir</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Excluir venda?</DialogTitle>
                <DialogDescription>
                  Esta ação não pode ser desfeita.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    deleteSale(sale.id);
                    setConfirmOpen(false);
                  }}
                >
                  Excluir
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];

export function SaleTable() {
  const { data: sales = [], isLoading } = useSales();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <article className="flex flex-col gap-2">
            <CardTitle className="text-2xl">Vendas</CardTitle>
            <CardDescription className="text-base">
              Registre e gerencie as vendas de materiais reciclados de sua(s)
              cooperativa(s).
            </CardDescription>
          </article>

          <CardAction className="flex w-full gap-2 md:w-fit">
            <Button
              variant="outline"
              onClick={() => exportSalesPDF(sales)}
              disabled={sales.length === 0}
            >
              <FileDown className="h-4 w-4" />
              Exportar PDF
            </Button>
            <Button
              className="bg-primary-green hover:bg-primary-green/90 text-white"
              onClick={() => setDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Registrar venda
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-8 text-muted-foreground">
              Carregando...
            </div>
          ) : (
            <DataTable
              columns={saleColumns}
              data={sales}
              searchableColumn={{
                key: "buyerName",
                placeholder: "Buscar por comprador...",
              }}
            />
          )}
        </CardContent>
      </Card>

      <CreateSaleDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
