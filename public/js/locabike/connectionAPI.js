
class connectionAPI {
  constructor(url) {
    this.url = url;
    this.getAllStations();
    this.refresh = setInterval(() => this.getAllStations(), 60000);
  }

  ajaxGet(url, callback) {
    let req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function() {
      if (req.status >= 200 && req.status < 400) {
        callback(req.responseText);
      } else {
        console.error(req.status + " " + req.statusText + " " + url);
      }
    });
    req.addEventListener("error", function() {
      console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
  }

  /* Get all stations from API to create markers on map*/
  getAllStations() {
    let markers = new L.markerClusterGroup();
    markers.clearLayers();
    this.ajaxGet(this.url, response => {
      let jcResponse = response;
      let stationsJSON = JSON.parse(jcResponse);

      stationsJSON.forEach(stationInfo => {
        const station = new Station(
          stationInfo.position.lat,
          stationInfo.position.lng,
          stationInfo.number,
          stationInfo.name,
          stationInfo.address,
          stationInfo.status,
          stationInfo.bike_stands,
          stationInfo.available_bike_stands,
          stationInfo.available_bikes,
          stationInfo.last_update
        );
        markers.addLayer(station.marker);
      });
      map.created.addLayer(markers);
    });
  }
}
