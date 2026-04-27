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
import {
  useCooperativeCollects,
  useDeleteCollect,
} from "@/hooks/services/use-collects";
import type { Collect } from "@/types/collect";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { exportCollectHistoryPDF } from "@/utils/export-pdf";
import { Copy, FileDown, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CreateCollectDialog } from "./-create-collect-dialog";

// eslint-disable-next-line react-refresh/only-export-components
export const collectHistoryColumns: ColumnDef<Collect>[] = [
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
    accessorKey: "collectionPointName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ponto de coleta" />
    ),
    cell: ({ row }) => (
      <span>{row.getValue("collectionPointName") || "—"}</span>
    ),
  },
  {
    accessorKey: "collectedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data" />
    ),
    cell: ({ row }) => (
      <span>
        {format(new Date(row.getValue("collectedAt")), "dd/MM/yyyy HH:mm", {
          locale: ptBR,
        })}
      </span>
    ),
  },
  {
    accessorKey: "material",
    header: "Material",
    cell: ({ row }) => {
      const collect = row.original;
      if (!collect.material)
        return <span className="text-muted-foreground">—</span>;
      return (
        <Badge
          variant="outline"
          className="gap-1 text-xs"
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
      );
    },
  },
  {
    accessorKey: "weightKg",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Peso (kg)" />
    ),
    cell: ({ row }) => (
      <span>{Number(row.getValue("weightKg")).toFixed(2)} kg</span>
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
      const collect = row.original;
      const { mutate: deleteCollect } = useDeleteCollect();
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
                onClick={() => {
                  navigator.clipboard.writeText(collect.id);
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
                <DialogTitle>Excluir coleta?</DialogTitle>
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
                    deleteCollect(collect.id);
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

export function CollectHistoryTable() {
  const { data: collects = [], isLoading } = useCooperativeCollects();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <article className="flex flex-col gap-2">
            <CardTitle className="text-2xl">Histórico de coletas</CardTitle>
            <CardDescription className="text-base">
              Registre e acompanhe as coletas recebidas em sua(s)
              cooperativa(s).
            </CardDescription>
          </article>

          <CardAction className="flex w-full gap-2 md:w-fit">
            <Button
              variant="outline"
              onClick={() => exportCollectHistoryPDF(collects)}
              disabled={collects.length === 0}
            >
              <FileDown className="h-4 w-4" />
              Exportar PDF
            </Button>
            <Button
              className="bg-primary-green hover:bg-primary-green/90 text-white"
              onClick={() => setDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Registrar coleta
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
              columns={collectHistoryColumns}
              data={collects}
              searchableColumn={{
                key: "collectionPointName",
                placeholder: "Buscar por ponto de coleta...",
              }}
            />
          )}
        </CardContent>
      </Card>

      <CreateCollectDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
