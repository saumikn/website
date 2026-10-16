import * as L from "leaflet";

export async function getMap(map, maptype) {
  const getData = async (file) => {
    const response = await fetch(`./data/${maptype}/${file}.json`);
    if (!response.ok) throw new Error(`Could not load ${maptype}/${file}`);
    return response.json();
  };
  const prom1 = getData("airports");
  const prom2 = getData("routes");
  var [airports, routes] = await Promise.all([prom1, prom2]);

  var filterRouteLayer = L.layerGroup();
  var filterAirportLayer = L.layerGroup();
  var filterLabelLayer = L.layerGroup();
  let layerGroup;

  function getConnections(id) {
    var connections = new Set();
    connections.add(id);
    routes.features.forEach((x) => {
      var label = x.id.split("_");
      if (label[0] == id) {
        connections.add(label[1]);
      }
      if (label[1] == id) {
        connections.add(label[0]);
      }
    });
    return connections;
  }

  function filterId(id) {
    if (!layerGroup.hasLayer(filterRouteLayer)) {
      var connections = getConnections(id);
      layerGroup.removeLayer(lineLayer);
      layerGroup.removeLayer(halfLineLayer);
      layerGroup.removeLayer(clearLineLayer);
      layerGroup.removeLayer(airportLayer);
      layerGroup.removeLayer(labelLayer);
      filterAirportLayer = L.geoJSON(airports, {
        onEachFeature: onEachAirport,
        pointToLayer: airportToCircleMarker,
        filter: (feature, layer) => connections.has(feature.id),
      }).addTo(layerGroup);
      filterLabelLayer = L.geoJSON(airports, {
        onEachFeature: onEachAirport,
        pointToLayer: airportToLabel,
        filter: (feature, layer) => connections.has(feature.id),
      }).addTo(layerGroup);
      filterRouteLayer = L.geoJSON(routes, {
        style: (feature) => feature.properties.style,
        filter: (feature, layer) => feature.id.includes(id),
      }).addTo(layerGroup);
    }
  }

  function showAll() {
    if (layerGroup.hasLayer(filterLabelLayer)) {
      layerGroup.removeLayer(filterAirportLayer);
      layerGroup.removeLayer(filterLabelLayer);
      layerGroup.removeLayer(filterRouteLayer);
      layerGroup.addLayer(lineLayer);
      layerGroup.addLayer(halfLineLayer);
      layerGroup.addLayer(clearLineLayer);
      layerGroup.addLayer(airportLayer);
      layerGroup.addLayer(labelLayer);
    }
  }
  map.on("click", () => showAll());

  function onEachAirport(feature, layer) {
    layer.on("click", () => filterId(feature.id));
    layer.on("mouseover", () => filterId(feature.id));
    layer.on("mouseout", showAll);
  }

  function airportToCircleMarker(feature, latlng) {
    return L.circleMarker(latlng, {
      radius: map.getZoom() < 5 ? 2 : 4,
      color: "white",
      weight: 1,
      fillOpacity: 1,
      pane: "airports",
      bubblingMouseEvents: false,
    });
  }

  function airportToCircle(feature, latlng) {
    return L.circle(latlng, {
      radius: 20000,
      color: "green",
      opacity: 0,
      fillOpacity: 0,
      pane: "circles",
      bubblingMouseEvents: false,
    });
  }

  function airportToLabel(feature, latlng) {
    return L.marker(latlng, {
      icon: L.divIcon({
        className: "codes",
        iconAnchor: [0, 22],
        iconSize: [0, 0],
        html: feature.id,
      }),
    });
  }

  function styleLine(feature) {
    return { color: feature.properties.style.color, weight: 0.6 };
  }

  function styleClearLine(feature) {
    return { weight: 10, opacity: 0, fill: false };
  }

  function onEachClearLine(feature, layer) {
    layer.bindTooltip(feature.id);
    layer.on("mouseover", (ev) => layer.openTooltip(ev.latlng));
  }

  var airportLayer = L.geoJSON(airports, {
    pointToLayer: airportToCircleMarker,
  });
  var clearAirportLayer = L.geoJSON(airports, {
    onEachFeature: onEachAirport,
    pointToLayer: airportToCircle,
  });
  var labelLayer = L.geoJSON(airports, { pointToLayer: airportToLabel });
  var lineLayer = L.geoJSON(routes, { style: styleLine });
  var clearLineLayer = L.geoJSON(routes, {
    style: styleClearLine,
    onEachFeature: onEachClearLine,
  });

  // HalfRoutes is a bit of a hack, which allows the area next to a hub to be dominated by the hub routes, instead of other routes.
  // Doesn't really change any of the website functionality, just makes the maps look a bit cleaner.
  let halfRoutes = JSON.parse(JSON.stringify(routes));
  halfRoutes.features.forEach(
    (x) => (x.geometry.coordinates = x.geometry.coordinates.slice(0, 3))
  );
  var halfLineLayer = L.geoJSON(halfRoutes, { style: styleLine });

  layerGroup = L.layerGroup([
    airportLayer,
    clearAirportLayer,
    labelLayer,
    lineLayer,
    clearLineLayer,
    halfLineLayer,
  ]);
  // Reset the selection when changing airlines, without leaving filtered layers behind.
  layerGroup.on("remove", showAll);
  map.on("zoomend", () => {
    const radius = map.getZoom() < 5 ? 2 : 4;
    airportLayer.eachLayer(layer => layer.setRadius(radius));
    filterAirportLayer.eachLayer(layer => layer.setRadius(radius));
  });

  return layerGroup;
}
