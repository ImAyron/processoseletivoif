import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { touristicPoints, categoryMeta } from "@/data/tourism-data";
import type { Map as LMap, LayerGroup } from "leaflet";

export const Route = createFileRoute("/mapa")({
  head: () => ({ meta: [{ title: "Mapa Interativo | São Gonçalo do Rio Abaixo" }] }),
  component: MapaPage,
});

function MapaPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LMap | null>(null);
  const layerRef = useRef<LayerGroup | null>(null);
  const [activeCats, setActiveCats] = useState<Set<string>>(new Set(Object.keys(categoryMeta)));

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = await import("leaflet");
      if (cancelled || !containerRef.current || mapRef.current) return;
      const map = L.map(containerRef.current).setView([-19.8167, -43.3667], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);
      mapRef.current = map;
      layerRef.current = L.layerGroup().addTo(map);
      renderMarkers(L);
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapRef.current || !layerRef.current) return;
    import("leaflet").then((L) => renderMarkers(L));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCats]);

  function renderMarkers(L: typeof import("leaflet")) {
    if (!layerRef.current) return;
    layerRef.current.clearLayers();
    touristicPoints
      .filter((p) => activeCats.has(p.category))
      .forEach((p) => {
        const meta = categoryMeta[p.category];
        const icon = L.divIcon({
          className: "",
          html: `<div style="background:${meta.color};width:36px;height:36px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,.25);border:2px solid white;"><span style="transform:rotate(45deg);font-size:16px;">${meta.emoji}</span></div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
        });
        L.marker(p.coords, { icon })
          .bindPopup(
            `<div style="font-family:'DM Sans',sans-serif;min-width:180px;">
              <img src="${p.image}" style="width:100%;height:80px;object-fit:cover;border-radius:6px;margin-bottom:6px;" />
              <strong style="font-family:'Cormorant Garamond',serif;font-size:16px;">${p.name}</strong>
              <p style="margin:4px 0;font-size:12px;color:#555;">${p.shortDescription.slice(0, 80)}...</p>
              <a href="/pontos/${p.slug}" style="color:#C84B31;font-size:12px;font-weight:600;">Saiba mais →</a>
            </div>`
          )
          .addTo(layerRef.current!);
      });
  }

  function toggleCat(cat: string) {
    setActiveCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat); else next.add(cat);
      return next;
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      <header className="mb-8 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-terracotta">Geografia</span>
        <h1 className="font-display text-5xl md:text-6xl mt-3">Mapa Interativo</h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Explore todos os pontos turísticos da cidade.</p>
      </header>

      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {Object.entries(categoryMeta).map(([key, meta]) => (
          <button
            key={key}
            onClick={() => toggleCat(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${activeCats.has(key) ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border opacity-60"}`}
          >{meta.emoji} {meta.label}</button>
        ))}
      </div>

      <div ref={containerRef} className="w-full h-[70vh] rounded-2xl overflow-hidden shadow-elevated border border-border" />
    </div>
  );
}
