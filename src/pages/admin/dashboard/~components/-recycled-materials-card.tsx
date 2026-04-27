import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function RecycledMaterialsCard() {
  return (
    <Card className="flex w-full p-0 xl:w-1/2">
      <CardContent className="relative w-full p-0">
        <article className="relative flex h-32 items-center overflow-hidden rounded-t-2xl px-6">
          <div className="relative h-40 w-24 shrink-0">
            <img
              alt="Metal"
              className="pointer-events-none absolute bottom-0 h-full w-full object-contain"
              src="/assets/icons/metal.svg"
            />
          </div>

          <div className="ml-auto flex flex-col items-end">
            <span className="font-semibold text-2xl">10</span>
            <p className="text-muted-foreground text-sm">
              <span className="font-bold">
                Metais reciclados em sua(s) cooperativa(s)
              </span>
            </p>
          </div>
        </article>

        <Separator />

        <article className="relative flex h-34 items-center overflow-hidden bg-muted/30 px-6">
          <div className="flex flex-col">
            <span className="font-semibold text-2xl">20</span>
            <p className="text-muted-foreground text-sm">
              <span className="font-bold">
                Plásticos reciclados em sua(s) cooperativa(s)
              </span>
            </p>
          </div>

          <div className="ml-auto h-28 w-28 shrink-0">
            <img
              alt="Plastic"
              className="pointer-events-none h-full w-full object-contain"
              src="/assets/icons/plastic.svg"
            />
          </div>
        </article>

        <Separator />

        <article className="relative flex h-32 items-center overflow-hidden px-6">
          <div className="relative h-16 w-16 shrink-0">
            <img
              alt="Glass"
              className="pointer-events-none absolute bottom-0 h-full w-full object-contain"
              src="/assets/icons/glass.svg"
            />
          </div>

          <div className="ml-auto flex flex-col items-end">
            <span className="font-semibold text-2xl">30</span>
            <p className="text-muted-foreground text-sm">
              <span className="font-bold">
                Vidros reciclados em sua(s) cooperativa(s)
              </span>
            </p>
          </div>
        </article>
      </CardContent>
    </Card>
  );
}
