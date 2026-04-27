import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDeleteCollectionPoint } from "@/hooks/services/use-collection-points";
import type { CollectionPoint } from "@/types/collection-point";
import { Trash2 } from "lucide-react";

type Props = {
  point: CollectionPoint;
  isSelected?: boolean;
  onSelect?: () => void;
};

export function CollectionPointCard({ point, isSelected, onSelect }: Props) {
  const { mutate: deletePoint, isPending: isDeleting } =
    useDeleteCollectionPoint();

  const directionsUrl =
    point.latitude && point.longitude
      ? `https://www.google.com/maps/dir/?api=1&destination=${point.latitude},${point.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${point.address}, ${point.number}, ${point.city}, ${point.state}`)}`;

  return (
    <div
      className={`cursor-pointer rounded-lg border bg-white p-4 shadow-sm transition-all dark:bg-secondary-dark ${
        isSelected ? "border-primary-green ring-1 ring-primary-green" : ""
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between">
        <article>
          <h2 className="font-bold text-lg text-primary-green">{point.name}</h2>

          {point.description && <p className="text-sm">{point.description}</p>}

          <p className="text-muted-foreground text-sm mt-2">
            {point.address}, {point.number} - {point.neighborhood}, {point.city}
            , {point.state}
          </p>
        </article>

        <Button
          variant="secondary"
          className="bg-red-100 hover:bg-red-100/80"
          disabled={isDeleting}
          onClick={(e) => {
            e.stopPropagation();
            deletePoint(point.id);
          }}
        >
          <Trash2 className="text-red-500" />
        </Button>
      </div>

      {point.materials.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {point.materials.map((material) => (
            <Badge
              key={material.id}
              variant="outline"
              className="gap-1 text-xs"
              style={{ borderColor: material.color, color: material.color }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: material.color }}
              />
              {material.name}
            </Badge>
          ))}
        </div>
      )}

      <div className="mt-3 text-muted-foreground text-xs">
        <span>
          {point.openingTime} – {point.closingTime}
        </span>
        {point.isOpen ? (
          <Badge className="ml-2 bg-green-100 px-1.5 py-0 text-green-700 text-xs hover:bg-green-100">
            Aberto
          </Badge>
        ) : (
          <Badge className="ml-2 bg-red-100 px-1.5 py-0 text-red-600 text-xs hover:bg-red-100">
            Fechado
          </Badge>
        )}
        <br />
        <span>{point.phone}</span>
      </div>

      <div className="mt-3 flex items-center justify-end">
        <Button
          size="sm"
          className="bg-primary-green text-white hover:bg-primary-green/90"
          onClick={(e) => {
            e.stopPropagation();
            window.open(directionsUrl, "_blank");
          }}
        >
          Como chegar
        </Button>
      </div>
    </div>
  );
}
