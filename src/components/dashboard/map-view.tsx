"use client";

import { useEffect, useState } from "react";
import { places, type Place } from "@/data/places";
import { getCategoryColor, getCategoryLabel } from "@/lib/utils";

export function MapView() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [MapComponents, setMapComponents] = useState<{
    MapContainer: typeof import("react-leaflet").MapContainer;
    TileLayer: typeof import("react-leaflet").TileLayer;
    CircleMarker: typeof import("react-leaflet").CircleMarker;
    Popup: typeof import("react-leaflet").Popup;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    import("react-leaflet").then((mod) => {
      setMapComponents({
        MapContainer: mod.MapContainer,
        TileLayer: mod.TileLayer,
        CircleMarker: mod.CircleMarker,
        Popup: mod.Popup,
      });
    });
    // @ts-ignore - CSS import for leaflet styles
    import("leaflet/dist/leaflet.css");
  }, []);

  const filteredPlaces =
    selectedCategory === "all"
      ? places
      : places.filter((p) => p.category === selectedCategory);

  const categories = ["all", "hotel", "cafe", "restaurant", "clinic", "coworking"];

  if (!mounted || !MapComponents) {
    return (
      <div className="w-full h-[600px] rounded-xl bg-gray-100 flex items-center justify-center">
        <p className="text-[var(--muted-foreground)]">Loading map...</p>
      </div>
    );
  }

  const { MapContainer, TileLayer, CircleMarker, Popup } = MapComponents;

  return (
    <div>
      {/* Category Filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedPlace(null);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={
              selectedCategory === cat
                ? {
                    backgroundColor:
                      cat === "all" ? "#374151" : getCategoryColor(cat),
                  }
                : undefined
            }
          >
            {cat === "all" ? "All" : getCategoryLabel(cat)} (
            {cat === "all"
              ? places.length
              : places.filter((p) => p.category === cat).length}
            )
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 h-[600px] rounded-xl overflow-hidden border border-[var(--border)]">
          <MapContainer
            center={[16.8, 100.24]}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredPlaces.map((place) => (
              <CircleMarker
                key={place.id}
                center={[place.lat, place.lng]}
                radius={Math.max(6, Math.min(14, place.reviewCount / 50))}
                fillColor={getCategoryColor(place.category)}
                color={selectedPlace?.id === place.id ? "#1e293b" : "white"}
                weight={selectedPlace?.id === place.id ? 3 : 2}
                opacity={1}
                fillOpacity={0.8}
                eventHandlers={{
                  click: () => setSelectedPlace(place),
                }}
              >
                <Popup>
                  <div className="min-w-[200px]">
                    <p className="font-bold text-sm">{place.name}</p>
                    <p className="text-xs text-gray-500">{place.subcategory}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-amber-500">
                        ★ {place.rating}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({place.reviewCount} reviews)
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{place.area}</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* Place List / Detail */}
        <div className="h-[600px] overflow-y-auto rounded-xl border border-[var(--border)] bg-white">
          {selectedPlace ? (
            <div className="p-4">
              <button
                onClick={() => setSelectedPlace(null)}
                className="text-xs text-[var(--primary)] hover:underline mb-3"
              >
                ← Back to list
              </button>
              <h3 className="text-lg font-bold">{selectedPlace.name}</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                {selectedPlace.subcategory} · {selectedPlace.area}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xl font-bold text-amber-500">
                  ★ {selectedPlace.rating}
                </span>
                <span className="text-sm text-[var(--muted-foreground)]">
                  ({selectedPlace.reviewCount} reviews)
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                <div>
                  <p className="text-[var(--muted-foreground)]">Hours</p>
                  <p className="font-medium">
                    {selectedPlace.openTime} - {selectedPlace.closeTime}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--muted-foreground)]">Price Level</p>
                  <p className="font-medium">
                    {"$".repeat(selectedPlace.priceLevel)}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--muted-foreground)]">Website</p>
                  <p className={selectedPlace.hasWebsite ? "text-green-600" : "text-red-500"}>
                    {selectedPlace.hasWebsite ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--muted-foreground)]">Social Media</p>
                  <p className={selectedPlace.hasSocialMedia ? "text-green-600" : "text-red-500"}>
                    {selectedPlace.hasSocialMedia ? "Yes" : "No"}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Top Keywords</p>
                <div className="flex flex-wrap gap-1">
                  {selectedPlace.topReviewKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2 py-0.5 bg-gray-100 text-xs rounded-full"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Recent Reviews</p>
                <div className="space-y-2">
                  {selectedPlace.reviews.slice(0, 5).map((review, i) => (
                    <div key={i} className="p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-xs text-amber-500">
                          {"★".repeat(review.rating)}
                        </span>
                        <span className="text-xs text-[var(--muted-foreground)]">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              <div className="p-3 bg-gray-50">
                <p className="text-xs font-medium text-[var(--muted-foreground)]">
                  {filteredPlaces.length} places · Click to view details
                </p>
              </div>
              {filteredPlaces.map((place) => (
                <button
                  key={place.id}
                  onClick={() => setSelectedPlace(place)}
                  className="w-full text-left p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{place.name}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {place.subcategory} · {place.area}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className="text-sm font-bold"
                        style={{
                          color:
                            place.rating >= 4.0 ? "#16a34a" : "#dc2626",
                        }}
                      >
                        ★ {place.rating}
                      </span>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {place.reviewCount} reviews
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
