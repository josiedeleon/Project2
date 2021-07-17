// An example of an array of cities and their locations
// Will need to create a for-loop that will grab each gold winning city, silver winning city, and bronze winning city along with latitude and longitude
var cities = [
    {
      name: "Paris",
      location: [48.8566, 2.3522]
    },
    {
      name: "Lyon",
      location: [45.7640, 4.8357]
    },
    {
      name: "Cannes",
      location: [43.5528, 7.0174]
    },
    {
      name: "Nantes",
      location: [47.2184, -1.5536]
    }
  ];
  
  // An array which will be used to store created cityMarkers
  var cityMarkers = [];
  
  for (var i = 0; i < cities.length; i++) {
    // loop through the cities array, create a new marker, push it to the cityMarkers array
    goldCityMarkers.push(
      L.marker(cities[i].location).bindPopup("<h1>" + cities[i].name + "</h1>" + "Num of Medals")
    );
  }
  
  // Add all the cityMarkers to a new layer group.
  // Now we can handle them as one group instead of referencing each individually
  var cityLayerGold = L.layerGroup(goldCityMarkers);
//   var cityLayerSilver = L.layerGroup(silverCityMarkers);
//   var cityLayerBronze = L.layerGroup(bronzeCityMarkers);
  
  var RegMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });
  
  // Only one base layer can be shown at a time
  // Perhaps adding a different base layer in the future
  var baseMaps = {
    "Regular": RegMap
  };
  
  // Overlays that may be toggled on or off
  var overlayMaps = {
    // "All Winning Cities": allCities,
    "Gold Medal Cities": cityLayerGold,
    // "Silver Medal Cities": cityLayerSilver,
    // "Bronze Medal Cities": cityLayerBronze
  };
  
  // Create map object and set layers
  // Center at Lisbon Portugal
  var myMap = L.map("map", {
    center: [38.7223, -9.1393],
    zoom: 3,
    layers: [RegMap, cityLayer]
  });
  
  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);
  