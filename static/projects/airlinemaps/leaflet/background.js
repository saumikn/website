import * as L from "leaflet";

// The local outlines remain available if WebGL or the external tile service fails.
// Both backgrounds use native dark colors; no color-inversion filter is applied.
export function addBackground(map, { onReady, onFallback }) {
  map.createPane("backgroundOutlines");
  map.getPane("backgroundOutlines").style.zIndex = 150;
  map.getPane("backgroundOutlines").style.pointerEvents = "none";
  const outlines = L.layerGroup().addTo(map);
  const localBackground = Promise.all(["countries", "states"].map(async (name) => {
    const response = await fetch(`./data/background/${name}.json`);
    if (!response.ok) throw new Error(`Could not load background ${name}`);
    const geometry = await response.json();
    L.geoJSON(geometry, {
      pane: "backgroundOutlines",
      interactive: false,
      style: {
        color: name === "countries" ? "#404040" : "#353535",
        weight: 0.7,
        fill: name === "countries",
        fillColor: "#252525",
        fillOpacity: 1,
      },
    }).addTo(outlines);
  }));
  // Catch failures even when the vector background succeeds first.
  localBackground.catch(() => {});

  map.attributionControl.addAttribution(
    '<a href="https://openfreemap.org/">OpenFreeMap</a> &copy; ' +
    '<a href="https://openmaptiles.org/">OpenMapTiles</a> ' +
    '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a> | ' +
    '<a href="./styles/LICENSE-dark-matter.txt">Dark Matter design</a> | ' +
    '<a href="https://www.naturalearthdata.com/">Natural Earth</a>'
  );

  let basemap;
  let failed = false;
  let timeout;
  const useFallback = () => {
    if (failed) return;
    failed = true;
    clearTimeout(timeout);
    if (basemap && map.hasLayer(basemap)) map.removeLayer(basemap);
    map.getContainer().classList.remove("background-ready");
    map.getContainer().classList.add("background-fallback");
    onFallback();
  };

  async function startVectorBackground() {
    try {
      const [{ setWorkerUrl }, { maplibreGL }] = await Promise.all([
        import("maplibre-gl"),
        import("../vendor/maplibre-leaflet/leaflet-maplibre-gl.mjs"),
      ]);
      const probe = document.createElement("canvas").getContext("webgl2");
      if (!probe) {
        useFallback();
        return;
      }
      probe.getExtension("WEBGL_lose_context")?.loseContext();
      setWorkerUrl(new URL("../vendor/maplibre/maplibre-gl-worker.mjs", import.meta.url).href);
      basemap = maplibreGL({
        style: new URL("../styles/dark-matter.json", import.meta.url).href,
        attributionControl: false,
      });
      basemap.addTo(map);
      const renderer = basemap.getMaplibreMap();
      timeout = setTimeout(useFallback, 20000);
      renderer.on("error", useFallback);
      renderer.getCanvas().addEventListener("webglcontextlost", useFallback);
      renderer.on("load", () => {
        if (failed) return;
        clearTimeout(timeout);
        map.getContainer().classList.add("background-ready");
        onReady();
      });
    } catch {
      useFallback();
    }
  }
  startVectorBackground();
}
