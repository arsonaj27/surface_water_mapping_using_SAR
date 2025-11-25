// ===== Leaflet Map: Kulekhani Reservoir Focus =====
(function() {
  var mapEl = document.getElementById('map');
  if (!mapEl) return;

  // Center map on Kulekhani Reservoir (approx from your GEE geometry)
  // Coordinates derived from: [85.12, 27.63] to [85.18, 27.58]
  var map = L.map('map').setView([27.608, 85.153], 13);

  // Dark basemap for better contrast with water masks
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }).addTo(map);

  // Placeholder Polygon: Approximating the reservoir shape
  // You should replace this 'coordinates' array with your actual exported GeoJSON from GEE
  var waterPolygon = {
    "type": "Feature",
    "properties": { "name": "Kulekhani Water Extent (Oct 2019)" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[
        [85.145, 27.620], [85.150, 27.618], [85.155, 27.615], 
        [85.160, 27.610], [85.165, 27.605], [85.160, 27.600], 
        [85.150, 27.602], [85.140, 27.610], [85.135, 27.615], 
        [85.145, 27.620]
      ]]
    }
  };

  L.geoJSON(waterPolygon, {
    style: { color: "#4ea1ff", weight: 2, fillOpacity: 0.4 }
  }).bindPopup("<b>Detected Water Extent</b><br>Method: Edge Otsu").addTo(map);
})();


// ===== Plotly Time Series: Satellite vs. Site Data =====
(function() {
  var chartEl = document.getElementById('timeseries');
  if (!chartEl) return;

  // Placeholder Data: Replace these arrays with your Python analysis results
  var dates = ['2019-10', '2019-11', '2019-12', '2020-01', '2020-02', '2020-03'];
  
  // Trace 1: Calculated Area (Satellite)
  var sarArea = {
    x: dates,
    y: [2.1, 1.95, 1.80, 1.75, 1.60, 1.55], // Dummy values in km²
    mode: 'lines+markers',
    name: 'SAR Derived Area',
    line: { color: '#4ea1ff', width: 3 }
  };

  // Trace 2: Site Data (Ground Truth)
  var siteArea = {
    x: dates,
    y: [2.15, 1.98, 1.82, 1.78, 1.65, 1.58], // Dummy values in km²
    mode: 'lines+markers',
    name: 'In-situ Measurement',
    line: { color: '#ff9f43', width: 3, dash: 'dot' }
  };

  var layout = {
    title: { text: 'Water Area Comparison', font: { color: '#e9eef7' } },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    xaxis: { 
      title: 'Date', 
      color: '#b5c1d6', 
      gridcolor: '#1c264a' 
    },
    yaxis: { 
      title: 'Area (km²)', 
      color: '#b5c1d6', 
      gridcolor: '#1c264a' 
    },
    legend: { x: 0, y: 1, font: { color: '#e9eef7' } }
  };

  Plotly.newPlot(chartEl, [sarArea, siteArea], layout, {responsive: true});
})();
