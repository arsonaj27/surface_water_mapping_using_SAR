// Placeholder JS for Plotly time series and Leaflet map
// ===== Plotly Time Series (on data.html) =====
(function() {
  var el = document.getElementById('timeseries');
  if (!el) return;
  // Dummy monthly area data (replace with your numbers)
  var months = ['2024-01','2024-02','2024-03','2024-04','2024-05','2024-06','2024-07','2024-08','2024-09','2024-10','2024-11','2024-12'];
  var area_km2 = [2.3,2.1,2.8,3.2,3.0,2.9,2.7,2.5,2.4,2.6,2.9,3.1];
  var trace = { x: months, y: area_km2, mode: 'lines+markers', name: 'Water area (km²)' };
  var layout = { title: 'Monthly Surface Water Area (Placeholder)', xaxis: {title: 'Month'}, yaxis: {title: 'Area (km²)'} };
  Plotly.newPlot(el, [trace], layout, {responsive: true});
})();

// ===== Leaflet Map (on results.html) =====
(function() {
  var mapDiv = document.getElementById('map');
  if (!mapDiv) return;
  var map = L.map('map').setView([27.633, 85.15], 12); // Replace with your AOI center
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Example GeoJSON placeholder (replace with your exported contours/polygons)
  var samplePoly = {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {"name":"Water Polygon (placeholder)"},
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[85.14,27.63],[85.16,27.63],[85.16,27.62],[85.14,27.62],[85.14,27.63]]]
      }
    }]
  };
  L.geoJSON(samplePoly, { style: { weight: 1 } }).addTo(map);
})();