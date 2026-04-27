import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { CollectionPoint } from "@/types/collection-point";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const SAO_PAULO: [number, number] = [-23.5505, -46.6333];

function LocationCentering() {
  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        map.flyTo([coords.latitude, coords.longitude], 13, { animate: true });
      },
      () => {
        // Permission denied or unavailable — keep default center
      },
      { timeout: 8000 },
    );
  }, [map]);

  return null;
}

type Props = {
  points: CollectionPoint[];
  onSelectPoint?: (id: string) => void;
};

export function CollectionPointMap({ points, onSelectPoint }: Props) {
  const validPoints = points.filter(
    (p) => p.latitude !== "" && p.longitude !== "",
  );

  return (
    <div style={{ isolation: "isolate", height: "100%", width: "100%" }}>
      <MapContainer
        center={SAO_PAULO}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationCentering />

        {validPoints.map((point) => {
          const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${point.latitude},${point.longitude}`;

          return (
            <Marker
              key={point.id}
              position={[
                parseFloat(point.latitude),
                parseFloat(point.longitude),
              ]}
            >
              <Popup minWidth={240}>
                <div className="space-y-2 text-sm">
                  <p
                    className="font-bold text-base"
                    style={{ color: "#2d7a2d" }}
                  >
                    {point.name}
                  </p>

                  {point.description && (
                    <p className="text-xs">{point.description}</p>
                  )}

                  <p className="text-xs text-gray-500">
                    {point.address}, {point.number} — {point.neighborhood},{" "}
                    {point.city}
                  </p>

                  {point.materials.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {point.materials.map((m) => (
                        <span
                          key={m.id}
                          className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs"
                          style={{ borderColor: m.color, color: m.color }}
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: m.color }}
                          />
                          {m.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>
                      {point.openingTime} – {point.closingTime}
                    </span>
                    <span
                      className="rounded px-1.5 py-0.5 font-medium"
                      style={
                        point.isOpen
                          ? { background: "#dcfce7", color: "#15803d" }
                          : { background: "#fee2e2", color: "#dc2626" }
                      }
                    >
                      {point.isOpen ? "Aberto" : "Fechado"}
                    </span>
                  </div>

                  {point.phone && (
                    <p className="text-xs text-gray-500">{point.phone}</p>
                  )}

                  <div className="flex gap-2 pt-1">
                    <button
                      className="flex-1 rounded px-2 py-1 text-xs font-medium text-white"
                      style={{ background: "#2d7a2d" }}
                      onClick={() => window.open(directionsUrl, "_blank")}
                    >
                      Como chegar
                    </button>
                    {onSelectPoint && (
                      <button
                        className="flex-1 rounded border px-2 py-1 text-xs font-medium"
                        style={{ borderColor: "#2d7a2d", color: "#2d7a2d" }}
                        onClick={() => onSelectPoint(point.id)}
                      >
                        Ver detalhes
                      </button>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
