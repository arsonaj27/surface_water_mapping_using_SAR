// Import HydraFloods module
var hydrafloods = require('users/kelmarkert/hydrafloods:main.js');

// Define Region of Interest: Kulekhani Reservoir
var geometry = ee.Geometry.Polygon(
  [[[85.12266294746495, 27.6337444538432],
    [85.12266294746495, 27.582633628899824],
    [85.18411772041416, 27.582633628899824],
    [85.18411772041416, 27.6337444538432]]],
  null, false
);

Map.centerObject(geometry, 12);
Map.addLayer(geometry, {color:'red'}, 'Kulekhani AOI');

// Sentinel-1 data collection 

var s1 = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterBounds(geometry)
  .filterDate('2015-01-01', '2015-12-31') 
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .select('VV');

var count = s1.size().getInfo();
print('Processing ' + count + ' images...');

var s1List = s1.toList(count);

// Loop through images individually

for (var i = 0; i < count; i++) {
  
  // A. Get the single raw image
  var rawImg = ee.Image(s1List.get(i));
  
  // B. Apply Speckle Filter (LeeSigma works on single images)
  var smoothed = hydrafloods.filtering.leeSigma(rawImg);
  
  // C. CRITICAL FIX: Wrap the image in a Collection 
  // The edgeOtsu function demands a Collection, so we give it a collection of 1.
  var singleImageCollection = ee.ImageCollection([smoothed]);
  
  // D. Run Edge Otsu
  var edgeWater = hydrafloods.thresholding.edgeOtsu(
    singleImageCollection,
    {
      initialThreshold: -20,
      smoothEdges: 300,
      verbose: false 
    }
  );
Map.addLayer(edgeWater.clip(geometry),
  {palette:['white','blue']},
  'Edge Otsu Water Mask');

  // E. Create Filename
  var imgId = rawImg.id().getInfo();
  var fileName = 'Kulekhani_Binary_' + imgId;

  // F. Export
  // Note: edgeOtsu usually returns an Image when run this way.
  Export.image.toDrive({
    image: edgeWater.clip(geometry),
    description: fileName, 
    folder: 'GEE_Kulekhani_2014_2017', 
    scale: 10,
    region: geometry,
    crs: 'EPSG:4326',
    maxPixels: 1e13
  });
}