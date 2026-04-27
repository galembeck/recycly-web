import { useAllCollectionPoints } from "@/hooks/services/use-collection-points";
import type { Material } from "@/types/material";
import { Loader2, MapPin, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PublicCollectionPointMap } from "./-public-collection-point-map";

const RADIUS_OPTIONS: { label: string; value: number | null }[] = [
  { label: "5 km", value: 5 },
  { label: "10 km", value: 10 },
  { label: "20 km", value: 20 },
  { label: "50 km", value: 50 },
  { label: "Todos", value: null },
];

function haversineKm(a: [number, number], b: [number, number]): number {
  const R = 6371;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLng = ((b[1] - a[1]) * Math.PI) / 180;
  const c =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a[0] * Math.PI) / 180) *
      Math.cos((b[0] * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c));
}

export function MapSection() {
  const { data: allPoints = [], isLoading } = useAllCollectionPoints();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );
  const [locationDenied, setLocationDenied] = useState(false);
  const [locating, setLocating] = useState(true);
  const [radiusKm, setRadiusKm] = useState<number | null>(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMaterialIds, setSelectedMaterialIds] = useState<string[]>([]);

  useEffect(() => {
    if (!navigator.geolocation) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocationDenied(true);
      setLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserLocation([coords.latitude, coords.longitude]);
        setLocating(false);
      },
      () => {
        setLocationDenied(true);
        setLocating(false);
      },
      { timeout: 8000 },
    );
  }, []);

  const allMaterials = useMemo<Material[]>(() => {
    const map = new Map<string, Material>();
    allPoints.forEach((p) => p.materials?.forEach((m) => map.set(m.id, m)));
    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [allPoints]);

  const filteredPoints = useMemo(() => {
    return allPoints.filter((p) => {
      if (!p.latitude || !p.longitude) return false;

      if (userLocation && radiusKm !== null) {
        const dist = haversineKm(userLocation, [
          parseFloat(p.latitude),
          parseFloat(p.longitude),
        ]);
        if (dist > radiusKm) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const hit = [p.name, p.address, p.neighborhood, p.city, p.zipCode].some(
          (v) => v?.toLowerCase().includes(q),
        );
        if (!hit) return false;
      }

      if (selectedMaterialIds.length > 0) {
        const hasAny = p.materials?.some((m) =>
          selectedMaterialIds.includes(m.id),
        );
        if (!hasAny) return false;
      }

      return true;
    });
  }, [allPoints, userLocation, radiusKm, searchQuery, selectedMaterialIds]);

  const toggleMaterial = (id: string) =>
    setSelectedMaterialIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const locationStatus = locating
    ? "Buscando sua localização..."
    : locationDenied
      ? "Permita o acesso à localização para filtrar por distância."
      : "Exibindo pontos próximos à sua localização.";

  return (
    <section
      className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      id="map"
    >
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="font-bold text-4xl text-primary-green-dark dark:text-white">
          Pontos de coleta{" "}
          <span className="text-primary-green">próximos a você</span>
        </h2>

        <p className="flex items-center gap-1.5 text-lg text-muted-foreground">
          {locating && <Loader2 className="h-3.5 w-3.5 animate-spin" />}

          {!locating && !locationDenied && (
            <MapPin className="h-4 w-4 text-primary-green" />
          )}
          {locationStatus}
        </p>
      </div>

      <div className="mb-4 flex flex-col gap-4 rounded-xl border bg-white dark:bg-card p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />

          <input
            type="text"
            placeholder="Buscar por nome, endereço, bairro, cidade ou CEP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border bg-background py-2 pl-9 pr-9 text-sm outline-none focus:ring-2 focus:ring-primary-green dark:bg-background"
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {!locationDenied && (
            <div className="flex flex-col gap-1.5">
              <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                <MapPin className="h-3 w-3" />
                Raio de busca
              </span>

              <div className="flex flex-wrap gap-1">
                {RADIUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setRadiusKm(opt.value)}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                      radiusKm === opt.value
                        ? "bg-primary-green text-white"
                        : "bg-muted text-muted-foreground hover:bg-muted/70"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {allMaterials.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-muted-foreground">
                Filtrar por material aceito
              </span>

              <div className="flex flex-wrap gap-1">
                {allMaterials.map((m) => {
                  const active = selectedMaterialIds.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      onClick={() => toggleMaterial(m.id)}
                      className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-all cursor-pointer"
                      style={
                        active
                          ? {
                              background: m.color,
                              borderColor: m.color,
                              color: "#fff",
                            }
                          : { borderColor: m.color, color: m.color }
                      }
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          backgroundColor: active ? "#fff" : m.color,
                        }}
                      />
                      {m.name}
                    </button>
                  );
                })}

                {selectedMaterialIds.length > 0 && (
                  <button
                    onClick={() => setSelectedMaterialIds([])}
                    className="inline-flex items-center gap-1 rounded-full border border-red-100 px-2.5 py-1 text-xs text-red-500 cursor-pointer hover:text-red-500/80"
                  >
                    <X className="h-3 w-3 text-red-500" />
                    Limpar filtros
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          {isLoading ? (
            "Carregando pontos de coleta..."
          ) : (
            <>
              <span className="font-semibold text-foreground">
                {filteredPoints.length}
              </span>{" "}
              ponto{filteredPoints.length !== 1 ? "s" : ""} encontrado
              {filteredPoints.length !== 1 ? "s" : ""}
              {allPoints.length > 0 && (
                <span className="text-muted-foreground">
                  {" "}
                  de {allPoints.length} cadastrado
                  {allPoints.length !== 1 ? "s" : ""}
                </span>
              )}
            </>
          )}
        </p>
      </div>

      <div className="h-105 overflow-hidden rounded-xl border shadow-sm md:h-145">
        <PublicCollectionPointMap
          points={filteredPoints}
          userLocation={userLocation}
        />
      </div>
    </section>
  );
}
