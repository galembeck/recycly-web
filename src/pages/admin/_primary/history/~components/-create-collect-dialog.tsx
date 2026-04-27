import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCollect } from "@/hooks/services/use-collects";
import { useCollectionPoints } from "@/hooks/services/use-collection-points";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  collectionPointId: z.string().min(1, "Selecione um ponto de coleta"),
  materialId: z.string().min(1, "Selecione um material"),
  weightKg: z.coerce.number().positive("Deve ser maior que zero"),
  collectedAt: z.string().min(1, "Informe a data"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateCollectDialog({ open, onOpenChange }: Props) {
  const { data: points = [] } = useCollectionPoints();
  const [selectedPointId, setSelectedPointId] = useState("");
  const { mutate: createCollect, isPending } = useCreateCollect(() =>
    onOpenChange(false),
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const selectedPoint = points.find((p) => p.id === selectedPointId);
  const availableMaterials = selectedPoint?.materials ?? [];

  function onSubmit(data: FormData) {
    createCollect({
      collectionPointId: data.collectionPointId,
      materialId: data.materialId,
      weightKg: data.weightKg,
      collectedAt: new Date(data.collectedAt).toISOString(),
      notes: data.notes || undefined,
    });
    reset();
    setSelectedPointId("");
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) { reset(); setSelectedPointId(""); }
        onOpenChange(v);
      }}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Registrar coleta</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label>Ponto de coleta</Label>
            <Controller
              control={control}
              name="collectionPointId"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(v) => {
                    field.onChange(v);
                    setSelectedPointId(v);
                    setValue("materialId", "");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um ponto..." />
                  </SelectTrigger>
                  <SelectContent>
                    {points.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.collectionPointId && (
              <p className="text-destructive text-xs">{errors.collectionPointId.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Material</Label>
            <Controller
              control={control}
              name="materialId"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={availableMaterials.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        selectedPointId
                          ? "Selecione um material..."
                          : "Selecione um ponto primeiro"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMaterials.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.materialId && (
              <p className="text-destructive text-xs">{errors.materialId.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Peso (kg)</Label>
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
              <Label>Data da coleta</Label>
              <Input type="datetime-local" {...register("collectedAt")} />
              {errors.collectedAt && (
                <p className="text-destructive text-xs">{errors.collectedAt.message}</p>
              )}
            </div>
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
