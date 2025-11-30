// // ===== Leaflet Map: Kulekhani Reservoir Focus =====
// (function() {
//   var mapEl = document.getElementById('map');
//   if (!mapEl) return;

//   // Center map on Kulekhani Reservoir (approx from your GEE geometry)
//   // Coordinates derived from: [85.12, 27.63] to [85.18, 27.58]
//   var map = L.map('map').setView([27.608, 85.153], 13);

//   // Dark basemap for better contrast with water masks
//   L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
//   }).addTo(map);

//   // Placeholder Polygon: Approximating the reservoir shape
//   // You should replace this 'coordinates' array with your actual exported GeoJSON from GEE
//   var waterPolygon = {
//     "type": "Feature",
//     "properties": { "name": "Kulekhani Water Extent (Oct 2019)" },
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [85.145, 27.620], [85.150, 27.618], [85.155, 27.615], 
//         [85.160, 27.610], [85.165, 27.605], [85.160, 27.600], 
//         [85.150, 27.602], [85.140, 27.610], [85.135, 27.615], 
//         [85.145, 27.620]
//       ]]
//     }
//   };

//   L.geoJSON(waterPolygon, {
//     style: { color: "#4ea1ff", weight: 2, fillOpacity: 0.4 }
//   }).bindPopup("<b>Detected Water Extent</b><br>Method: Edge Otsu").addTo(map);
// })();

// ===== Leaflet Map: Kulekhani Reservoir (Satellite + Rectangle) =====
(function () {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  // Center on Kulekhani Reservoir
  const map = L.map("map").setView([27.608, 85.153], 13);

  // 🛰 SATELLITE BASEMAP (Google-like quality)
  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 19,
      attribution: "ESRI World Imagery"
    }
  ).addTo(map);

  // 🏷 OPTIONAL LABELS (OSM names on top of satellite)
  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      opacity: 0.8,        // transparent so satellite is still visible
      attribution: "&copy; OSM Contributors"
    }
  ).addTo(map);

  // ▭ BIG RECTANGLE covering entire reservoir area
  // You can adjust these coordinates if needed
  const reservoirBounds = [
    [27.630, 85.120],  // NW corner
    [27.580, 85.185]   // SE corner
  ];

  const rectangle = L.rectangle(reservoirBounds, {
    color: "#00b7ff",
    weight: 3,
    fillOpacity: 0.18
  }).addTo(map);

  rectangle.bindPopup("<b>Kulekhani Reservoir</b><br>Bounding Rectangle Overlay");

  // (Optional) REMOVE POLYGON
  // (You can re-add your actual GEE water masks later here)

})();




// // ===== Plotly Time Series: Satellite vs. Site Data =====
// (function() {
//   var chartEl = document.getElementById('timeseries');
//   if (!chartEl) return;

//   // Placeholder Data: Replace these arrays with your Python analysis results
//   var dates = ['2019-10', '2019-11', '2019-12', '2020-01', '2020-02', '2020-03'];
  
//   // Trace 1: Calculated Area (Satellite)
//   var sarArea = {
//     x: dates,
//     y: [2.1, 1.95, 1.80, 1.75, 1.60, 1.55], // Dummy values in km²
//     mode: 'lines+markers',
//     name: 'SAR Derived Area',
//     line: { color: '#4ea1ff', width: 3 }
//   };

//   // Trace 2: Site Data (Ground Truth)
//   var siteArea = {
//     x: dates,
//     y: [2.15, 1.98, 1.82, 1.78, 1.65, 1.58], // Dummy values in km²
//     mode: 'lines+markers',
//     name: 'In-situ Measurement',
//     line: { color: '#ff9f43', width: 3, dash: 'dot' }
//   };

//   var layout = {
//     title: { text: 'Water Area Comparison', font: { color: '#e9eef7' } },
//     paper_bgcolor: 'rgba(0,0,0,0)',
//     plot_bgcolor: 'rgba(0,0,0,0)',
//     xaxis: { 
//       title: 'Date', 
//       color: '#b5c1d6', 
//       gridcolor: '#1c264a' 
//     },
//     yaxis: { 
//       title: 'Area (km²)', 
//       color: '#b5c1d6', 
//       gridcolor: '#1c264a' 
//     },
//     legend: { x: 0, y: 1, font: { color: '#e9eef7' } }
//   };

//   Plotly.newPlot(chartEl, [sarArea, siteArea], layout, {responsive: true});
// })();
// ===== Plotly Time Series: JRC vs SAR vs In-situ =====
(function () {
  var chartEl = document.getElementById("timeseries");
  if (!chartEl) return;

  // ==== REAL DATA from kulekhani_water_area.csv ====
  // Year,Month,Area (JRC),In-Situ,Area (SAR)

  const dates = [
    "2014-Nov",
    "2014-Dec",
    "2015-Jan",
    "2015-Feb",
    "2015-Mar",
    "2015-Apr",
    "2015-May",
    "2015-Jun",
    "2015-Jul",
    "2015-Aug",
    "2015-Sep",
    "2015-Oct",
    "2015-Nov",
    "2015-Dec",
    "2016-Jan",
    "2016-Feb",
    "2016-Mar",
    "2016-Apr",
    "2016-May",
    "2016-Jun",
    "2016-Jul",
    "2016-Aug",
    "2016-Sep",
    "2016-Oct",
    "2016-Nov",
    "2016-Dec",
    "2017-Jan",
    "2017-Feb",
    "2017-Mar",
    "2017-Apr"
  ];

  const jrcArea = [
    1.7163,
    1.6722,
    1.5912,
    1.5903,
    1.7091,
    1.4391,
    0.0,
    1.3626,
    0.927,
    0.0,
    1.5642,
    1.6758,
    1.7181,
    1.7514,
    1.7487,
    1.6929,
    1.5867,
    1.3671,
    0.7461,
    0.9882,
    0.0,
    0.0,
    1.5822,
    1.6128,
    1.683,
    1.6956,
    1.6974,
    1.6011,
    1.4787,
    1.2807
  ];

  const insituArea = [
    1.856188178,
    1.862971362,
    1.863290104,
    1.842712581,
    1.815381526,
    1.78153639,
    1.632160389,
    1.387477796,
    1.279882346,
    1.567646022,
    1.567646022,
    1.684023414,
    1.744806609,
    1.778487719,
    1.77421958,
    1.664598975,
    1.520329722,
    1.383318589,
    1.110657908,
    0.965667324,
    1.027742049,
    1.25445996,
    1.464278406,
    1.568839719,
    1.638423699,
    1.666070524,
    1.653932849,
    1.57281871,
    1.429422707,
    1.244650411
  ];

  const sarArea = [
    1.594388148,
    1.580829822,
    1.50586026,
    1.59279305,
    1.536610187,
    1.546678941,
    1.295839144,
    1.047712932,
    1.124100359,
    1.000391718,
    1.224111366,
    1.679911707,
    1.453399289,
    1.650748244,
    1.562308973,
    1.579146109,
    1.29087662,
    1.194373247,
    0.936056136,
    0.809423151,
    0.996138126,
    1.272267154,
    1.447018901,
    1.488580041,
    1.551143293,
    1.553535939,
    1.590223172,
    1.495846595,
    1.400229386,
    1.235579921
  ];

  // ===== Helper: Pearson correlation =====
  function pearsonCorr(a, b) {
    const n = a.length;
    const meanA = a.reduce((s, v) => s + v, 0) / n;
    const meanB = b.reduce((s, v) => s + v, 0) / n;

    let num = 0,
      denA = 0,
      denB = 0;
    for (let i = 0; i < n; i++) {
      const da = a[i] - meanA;
      const db = b[i] - meanB;
      num += da * db;
      denA += da * da;
      denB += db * db;
    }
    return num / Math.sqrt(denA * denB);
  }

  const rSar = pearsonCorr(sarArea, insituArea);
  const rJrc = pearsonCorr(jrcArea, insituArea);

  // ===== Traces =====
  const traceSAR = {
    x: dates,
    y: sarArea,
    mode: "lines+markers",
    name: `SAR (R = ${rSar.toFixed(3)})`,
    line: { color: "#4ea1ff", width: 3 }
  };

  const traceJRC = {
    x: dates,
    y: jrcArea,
    mode: "lines+markers",
    name: `JRC (R = ${rJrc.toFixed(3)})`,
    line: { color: "#00e676", width: 3, dash: "dash" }
  };

  const traceInSitu = {
    x: dates,
    y: insituArea,
    mode: "lines+markers",
    name: "In-situ (Ground Truth)",
    line: { color: "#ff9f43", width: 3 }
  };

  // ===== Layout =====
  const layout = {
    title: {
      text: "Water Area Time Series: JRC & SAR vs In-situ",
      font: { color: "#e9eef7" }
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    xaxis: {
      title: "Date",
      color: "#b5c1d6",
      gridcolor: "#1c264a"
    },
    yaxis: {
      title: "Area (km²)",
      color: "#b5c1d6",
      gridcolor: "#1c264a"
    },
    legend: { font: { color: "#e9eef7" } }
  };

  Plotly.newPlot(chartEl, [traceSAR, traceJRC, traceInSitu], layout, {
    responsive: true
  });

  // ===== Show correlation under the chart =====
  const info = document.getElementById("correlation-info");
  if (info) {
    info.innerHTML = `
      <b>Correlation (R) with In-situ:</b><br>
      SAR vs In-situ: ${rSar.toFixed(3)}<br>
      JRC vs In-situ: ${rJrc.toFixed(3)}
    `;
  }
})();
