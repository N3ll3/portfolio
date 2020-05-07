class Station {
  constructor(
    long,
    lat,
    number,
    name,
    address,
    status,
    bikesStands,
    availableBikeStands,
    availableBikes,
    lastUpdate
  ) {
    // infos from API
    this.long = long;
    this.lat = lat;
    this.status = status;
    this.number = number;
    this.name = name;
    this.address = address;
    this.status = status;
    this.bikesStands = bikesStands;
    this.availableBikeStands = availableBikeStands;
    this.availableBikes = availableBikes;
    this.lastUpdate = lastUpdate;

    // icons for each state of station
    this.bikeIconIsOpen = this.createIcon(
      "js/locabike/leaflet/images/marker-icon-bike.png"
    );
    this.bikeIconIsClosed = this.createIcon(
      "js/locabike/leaflet/images/marker-icon-closed.png"
    );
    this.bikeIconIsLimit = this.createIcon(
      "js/locabike/leaflet/images/marker-icon-limitbike.png"
    );
    this.bikeIconIsFull = this.createIcon(
      "js/locabike/leaflet/images/marker-icon-fullbike.png"
    );

    // marker assign to station
    this.marker = this.createMarker(this.long, this.lat);
  }

  /* Create a marker for each station + addeventlistener on click*/

  /* @return marker (for cluster and add map)*/

  createMarker(long, lat) {
    //station CLOSED
    if (this.status === "CLOSED") {
      let marker = L.marker([long, lat], {
        icon: this.bikeIconIsClosed
      }).on("click", () => {
        this.displayInfoStationClosed(this.name);
      });
      return marker;

      //station OPEN +5 bikes availables
    } else if (this.status === "OPEN" && this.availableBikes >= 5) {
      let marker = L.marker([long, lat], {
        icon: this.bikeIconIsOpen
      }).on("click", () => this.clickManager());
      return marker;

      // station OPEN -5bikes availables
    } else if (
      this.status === "OPEN" &&
      this.availableBikes < 5 &&
      this.availableBikes !== 0
    ) {
      let marker = L.marker([long, lat], {
        icon: this.bikeIconIsLimit
      }).on("click", () => this.clickManager());
      return marker;

      // station OPEN no bikes availables
    } else if (this.status === "OPEN" && this.availableBikes === 0) {
      let marker = L.marker([long, lat], {
        icon: this.bikeIconIsFull
      }).on("click", () => {
        this.displayInfoStationOpen(
          this.name,
          this.address,
          this.availableBikes,
          this.availableBikeStands
        );
        htmlManager.disableReservation();
      });
      return marker;
    }
  }
  // Create icon with arg = this.icon
  createIcon(path) {
    let bikeIcon = L.icon({
      iconUrl: path,
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });
    return bikeIcon;
  }

  displayInfoStationClosed(name) {
    const showedDiv = document.getElementById("showed");
    showedDiv.style.visibility = "visible";
    showedDiv.textContent = `La station ${name} est actuellement fermée.`;
  }

  displayInfoStationOpen(name, address, availableBikes, availableBikeStands) {
    const showedDiv = document.getElementById("showed");
    showedDiv.style.visibility = "visible";

    const namePara = document.getElementById("stationName");
    namePara.textContent = `Nom de la station : ${name}`;

    const addressPara = document.getElementById("address");
    addressPara.textContent = `Adresse de la station : ${address}`;

    const placesPara = document.getElementById("places");
    placesPara.textContent = `Places disponibles : ${availableBikeStands}`;

    const bikesPara = document.getElementById("bikes");
    bikesPara.textContent = `Vélos disponibles : ${availableBikes}`;

    const inputHidden = document.getElementById("inputHidden");
    inputHidden.value = name;
  }

  // display info station on click and check if station already reserved
  clickManager() {
    this.displayInfoStationOpen(
      this.name,
      this.address,
      this.availableBikes,
      this.availableBikeStands
    );
    htmlManager.displayButtonResa();
    if (sessionStorage.getItem("duration") > 0) {
      htmlManager.disableReservation();
    } else {
      htmlManager.enableReservation();
    }
  }
}
