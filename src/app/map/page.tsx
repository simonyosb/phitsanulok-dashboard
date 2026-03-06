"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(
  () => import("@/components/dashboard/map-view").then((m) => m.MapView),
  { ssr: false, loading: () => <div className="h-[600px] bg-gray-100 rounded-xl animate-pulse" /> }
);

export default function MapPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Map View</h1>
        <p className="text-[var(--muted-foreground)] mt-1">
          Location intelligence — explore businesses across Phitsanulok
        </p>
      </div>
      <MapView />
    </div>
  );
}
