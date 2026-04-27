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
import { useCreateCollectionPoint } from "@/hooks/services/use-collection-points";
import { useMaterials } from "@/hooks/services/use-materials";
import type { CreateCollectionPointInput } from "@/types/collection-point";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  description: z.string().optional(),
  zipCode: z.string().length(8, "CEP deve ter 8 dígitos"),
  address: z.string().min(1, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().length(2, "Estado deve ter 2 letras"),
  openingTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Formato inválido"),
  closingTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Formato inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  materialIds: z.array(z.string()).min(1, "Selecione ao menos um material"),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateCollectionPointDialog({ open, onOpenChange }: Props) {
  const { data: materials = [] } = useMaterials();
  const { mutate: create, isPending } = useCreateCollectionPoint(() =>
    onOpenChange(false),
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      materialIds: [],
    },
  });

  async function handleZipBlur(zip: string) {
    if (zip.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${zip}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setValue("address", data.logradouro ?? "");
        setValue("neighborhood", data.bairro ?? "");
        setValue("city", data.localidade ?? "");
        setValue("state", data.uf ?? "");
      }
    } catch {
      // ignore
    }
  }

  function onSubmit(values: FormValues) {
    create(values as CreateCollectionPointInput);
  }

  function handleClose(o: boolean) {
    if (!o) reset();
    onOpenChange(o);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-primary-green">
            Novo ponto de coleta
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Nome *</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" {...register("description")} rows={2} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="zipCode">CEP *</Label>
              <Input
                id="zipCode"
                maxLength={8}
                {...register("zipCode")}
                onBlur={(e) => handleZipBlur(e.target.value)}
              />
              {errors.zipCode && (
                <p className="text-xs text-red-500">{errors.zipCode.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="state">Estado *</Label>
              <Input id="state" maxLength={2} {...register("state")} />
              {errors.state && (
                <p className="text-xs text-red-500">{errors.state.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="address">Endereço *</Label>
            <Input id="address" {...register("address")} />
            {errors.address && (
              <p className="text-xs text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="number">Número *</Label>
              <Input id="number" {...register("number")} />
              {errors.number && (
                <p className="text-xs text-red-500">{errors.number.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="complement">Complemento</Label>
              <Input id="complement" {...register("complement")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="neighborhood">Bairro *</Label>
              <Input id="neighborhood" {...register("neighborhood")} />
              {errors.neighborhood && (
                <p className="text-xs text-red-500">
                  {errors.neighborhood.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="city">Cidade *</Label>
              <Input id="city" {...register("city")} />
              {errors.city && (
                <p className="text-xs text-red-500">{errors.city.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="openingTime">Abertura *</Label>
              <Input
                id="openingTime"
                type="time"
                {...register("openingTime")}
              />
              {errors.openingTime && (
                <p className="text-xs text-red-500">
                  {errors.openingTime.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="closingTime">Fechamento *</Label>
              <Input
                id="closingTime"
                type="time"
                {...register("closingTime")}
              />
              {errors.closingTime && (
                <p className="text-xs text-red-500">
                  {errors.closingTime.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone">Telefone *</Label>
            <Input id="phone" type="tel" {...register("phone")} />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Materiais aceitos *</Label>
            <Controller
              name="materialIds"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-2">
                  {materials.map((material) => {
                    const checked = field.value.includes(material.id);
                    return (
                      <label
                        key={material.id}
                        className="flex cursor-pointer items-center gap-2 rounded-md border p-2 text-sm transition-colors hover:bg-muted"
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(v) => {
                            field.onChange(
                              v
                                ? [...field.value, material.id]
                                : field.value.filter((id) => id !== material.id),
                            );
                          }}
                        />
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: material.color }}
                        />
                        {material.name}
                      </label>
                    );
                  })}
                </div>
              )}
            />
            {errors.materialIds && (
              <p className="text-xs text-red-500">
                {errors.materialIds.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-primary-green hover:bg-primary-green/90"
              disabled={isPending}
            >
              {isPending ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
