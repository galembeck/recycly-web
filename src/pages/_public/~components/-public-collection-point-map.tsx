import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import type { CollectionPoint } from "@/types/collection-point";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const SAO_PAULO: [number, number] = [-23.5505, -46.6333];

function haversineKm(
  a: [number, number],
  b: [number, number],
): number {
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

function FlyToLocation({
  location,
}: {
  location: [number, number] | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (location) map.flyTo(location, 13, { animate: true });
  }, [map, location]);
  return null;
}

type Props = {
  points: CollectionPoint[];
  userLocation: [number, number] | null;
};

export function PublicCollectionPointMap({ points, userLocation }: Props) {
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

        <FlyToLocation location={userLocation} />

        {userLocation && (
          <CircleMarker
            center={userLocation}
            radius={9}
            pathOptions={{
              fillColor: "#2563eb",
              fillOpacity: 0.9,
              color: "#fff",
              weight: 2,
            }}
          >
            <Popup>
              <span className="text-xs font-medium">Você está aqui</span>
            </Popup>
          </CircleMarker>
        )}

        {points.map((point) => {
          const lat = parseFloat(point.latitude);
          const lng = parseFloat(point.longitude);
          const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
          const dist = userLocation
            ? haversineKm(userLocation, [lat, lng])
            : null;

          return (
            <Marker key={point.id} position={[lat, lng]}>
              <Popup minWidth={248}>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className="font-bold text-base leading-tight"
                      style={{ color: "#2d7a2d" }}
                    >
                      {point.name}
                    </p>
                    {dist !== null && (
                      <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                        {dist < 1
                          ? `${(dist * 1000).toFixed(0)} m`
                          : `${dist.toFixed(1)} km`}
                      </span>
                    )}
                  </div>

                  {point.description && (
                    <p className="text-xs text-gray-600">{point.description}</p>
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

                  <button
                    className="mt-1 w-full rounded px-2 py-1.5 text-xs font-medium text-white"
                    style={{ background: "#2d7a2d" }}
                    onClick={() => window.open(directionsUrl, "_blank")}
                  >
                    Como chegar
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
