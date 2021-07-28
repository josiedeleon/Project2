var local_flask = "http://127.0.0.1:5000//api/v1.0/medals";


d3.json(local_flask).then(function(response) {
  
    console.log(response[0]);
    
    // arrays to hold medal info
    var goldMedals = [];
    var silverMedals = [];
    var bronzeMedals = [];
    var allMedals = [];

    // customized icon colors
    var goldIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      var silverIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      var bronzeIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

    for (var i = 0; i < response.length; i++) {
        if (response[i].Gold_Medals > 0 ) {
            goldMedals.push(
            L.marker([response[i].Latitude, response[i].Longitude], {icon: goldIcon})
            .bindPopup("<h3>" + response[i].NOC + "</h3> <hr> <p>Total Gold Medals: " + response[i].Gold_Medals + "</p>")
            );
        } 
          if (response[i].Silver_Medals > 0 ) {
            silverMedals.push(
            L.marker([response[i].Latitude, response[i].Longitude], {icon: silverIcon})
            .bindPopup("<h3>" + response[i].NOC + "</h3> <hr> <p>Total Silver Medals: " + response[i].Silver_Medals + "</p>")
            );
          } 
          if (response[i].Bronze_Medals > 0 ) {
            bronzeMedals.push(
            L.marker([response[i].Latitude, response[i].Longitude], {icon: bronzeIcon})
            .bindPopup("<h3>" + response[i].NOC + "</h3> <hr> <p>Total Bronze Medals: " + response[i].Bronze_Medals + "</p>")
            );
          } 
          
          // Finally all medals
          if (response[i].Total_Medals > 0 ) {
            allMedals.push(
            L.marker([response[i].Latitude, response[i].Longitude])
            .bindPopup("<h1>" + response[i].NOC + "</h1> <hr> <h3>Total Olympic Medals: " + response[i].Total_Medals + "</h3>")
            );
          }
    
    }
    // Add all the cityMarkers to a new layer group.
    var cityLayerGold = L.layerGroup(goldMedals);
    var cityLayerSilver = L.layerGroup(silverMedals);
    var cityLayerBronze = L.layerGroup(bronzeMedals);
    var allCountryMedals = L.layerGroup(allMedals);

    // Regular layer
    var RegMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

    // Only one base layer can be shown at a time
    var baseMaps = {
        "Regular": RegMap
    };

    // Overlays that may be toggled on or off
    var overlayMaps = {
    "Gold Medal Countries": cityLayerGold,
    "Silver Medal Countries": cityLayerSilver,
    "Bronze Medal Countries": cityLayerBronze,
    "All Winning Countries": allCountryMedals
  };
  

  // Create map object and set layers
  var myMap = L.map("mapmedals", {
    center: [30, 0],
    zoom: 2,
    layers: [RegMap]
  });
  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);
 
  });

 