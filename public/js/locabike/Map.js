class Map {
  /**
   *Creates an instance of Map.
   * @param {div where the map will be} div
   */
  constructor(div) {
    // position Toulouse
    this.latitude = 43.60128;
    this.longitude = 1.44118;
    this.div = div;
    this.created = this.createMap(this.div, this.latitude, this.longitude);
  }

  createMap(mapDiv, lat, long) {
    let mapCreated = L.map(mapDiv).setView([lat, long], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
      attribution:
        'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
      maxZoom: 20,
      minZoom: 1,
      scrollWheelZoom: false,
      tap: false
    }).addTo(mapCreated);

    return mapCreated;
  }
}
