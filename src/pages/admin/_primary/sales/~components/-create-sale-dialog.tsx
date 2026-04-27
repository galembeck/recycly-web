import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateSale } from "@/hooks/services/use-sales";
import { useMaterials } from "@/hooks/services/use-materials";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  buyerName: z.string().min(1, "Informe o comprador"),
  materialIds: z.array(z.string()).min(1, "Selecione ao menos um material"),
  weightKg: z.coerce.number().positive("Deve ser maior que zero"),
  price: z.coerce.number().positive("Deve ser maior que zero"),
  soldAt: z.string().min(1, "Informe a data"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateSaleDialog({ open, onOpenChange }: Props) {
  const { data: materials = [] } = useMaterials();
  const { mutate: createSale, isPending } = useCreateSale(() =>
    onOpenChange(false),
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { materialIds: [] },
  });

  const selectedIds = watch("materialIds") ?? [];

  function onSubmit(data: FormData) {
    createSale({
      buyerName: data.buyerName,
      materialIds: data.materialIds,
      weightKg: data.weightKg,
      price: data.price,
      soldAt: new Date(data.soldAt).toISOString(),
      notes: data.notes || undefined,
    });
    reset();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) reset();
        onOpenChange(v);
      }}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Registrar venda</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label>Comprador</Label>
            <Input placeholder="Nome do comprador..." {...register("buyerName")} />
            {errors.buyerName && (
              <p className="text-destructive text-xs">{errors.buyerName.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Materiais</Label>
            <Controller
              control={control}
              name="materialIds"
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-2 rounded-md border p-3">
                  {materials.map((m) => (
                    <label
                      key={m.id}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <Checkbox
                        checked={field.value?.includes(m.id)}
                        onCheckedChange={(checked) => {
                          const next = checked
                            ? [...(field.value ?? []), m.id]
                            : (field.value ?? []).filter((id) => id !== m.id);
                          field.onChange(next);
                        }}
                      />
                      <Badge
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
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.materialIds && (
              <p className="text-destructive text-xs">{errors.materialIds.message}</p>
            )}
            {selectedIds.length > 0 && (
              <p className="text-xs text-muted-foreground">
                {selectedIds.length} material(is) selecionado(s)
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Peso total (kg)</Label>
              <Input
                type="number"
                step="0.001"
                placeholder="0.000"
                {...register("weightKg")}
              />
              {errors.weightKg && (
                <p className="text-destructive text-xs">{errors.weightKg.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Valor total (R$)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("price")}
              />
              {errors.price && (
                <p className="text-destructive text-xs">{errors.price.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label>Data da venda</Label>
            <Input type="datetime-local" {...register("soldAt")} />
            {errors.soldAt && (
              <p className="text-destructive text-xs">{errors.soldAt.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Observações (opcional)</Label>
            <Textarea
              placeholder="Informações adicionais..."
              {...register("notes")}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-primary-green hover:bg-primary-green/90 text-white"
            >
              {isPending ? "Registrando..." : "Registrar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
