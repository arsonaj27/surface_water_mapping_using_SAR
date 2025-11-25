// ============================================
// 1. Leaflet Map Initialization
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Center map on Kulekhani Reservoir [Lat, Lon]
    var map = L.map('map').setView([27.608, 85.153], 13);

    // Light basemap to match the "Lighter Theme"
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Example Polygon: Kulekhani Reservoir Extent (Dummy Geometry)
    // In your real project, replace 'coordinates' with your GeoJSON from GEE export
    var reservoirPolygon = {
        "type": "Feature",
        "properties": {
            "name": "Kulekhani Reservoir",
            "date": "2020-10-15",
            "area_km2": 2.15
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [[
                [85.145, 27.620], [85.152, 27.618], [85.158, 27.615], 
                [85.162, 27.610], [85.165, 27.605], [85.160, 27.595], 
                [85.150, 27.600], [85.142, 27.610], [85.145, 27.620]
            ]]
        }
    };

    // Add Polygon to Map with Blue Water styling
    L.geoJSON(reservoirPolygon, {
        style: {
            color: "#3498db",  // Border color (Accent Blue)
            weight: 2,
            fillColor: "#3498db",
            fillOpacity: 0.6
        }
    }).bindPopup("<b>Kulekhani Reservoir</b><br>Detected Water Extent<br>Oct 2020").addTo(map);

});

// ============================================
// 2. Plotly Time Series Chart
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    var chartElement = document.getElementById('timeseries');

    // Dummy Data simulating Seasonal Variations (Monsoon vs Dry)
    var dates = [
        '2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06', 
        '2019-07', '2019-08', '2019-09', '2019-10', '2019-11', '2019-12'
    ];
    
    // Surface Area (km2) - Low in pre-monsoon (April/May), High in post-monsoon (Sept/Oct)
    var waterArea = [
        1.80, 1.75, 1.70, 1.65, 1.60, 1.90, // Dry -> Monsoon start
        2.20, 2.35, 2.40, 2.30, 2.10, 1.95  // Monsoon peak -> Post-monsoon
    ];

    var trace1 = {
        x: dates,
        y: waterArea,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Water Area (km²)',
        line: { color: '#3498db', width: 3 }, // Matches theme accent
        marker: { size: 6, color: '#2980b9' }
    };

    var layout = {
        title: { text: '', font: { size: 16 } }, // Title handled by HTML
        margin: { t: 20, r: 20, l: 40, b: 40 },
        hovermode: 'closest',
        plot_bgcolor: '#ffffff',
        paper_bgcolor: '#ffffff',
        xaxis: {
            title: 'Date',
            showgrid: false,
            zeroline: false
        },
        yaxis: {
            title: 'Area (km²)',
            showgrid: true,
            gridcolor: '#f0f0f0',
            zeroline: false
        }
    };

    var config = { responsive: true };

    Plotly.newPlot(chartElement, [trace1], layout, config);
});
