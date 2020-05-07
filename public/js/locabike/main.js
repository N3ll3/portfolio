/*------------------Instanciation / Object -----------------------*/
const htmlManager = new HTMLmanager();

const slider = new Slider(document.getElementById("diaporama"));

const map = new Map(document.getElementById("map"));

const allStations = new connectionAPI(
  `https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=80efe58cab643be867e74b893d7e9ff178e71651`
);
const signPad = document.getElementById("signPad");
let canvas;
let timer = new Timer(1200);
let resa;

/*-----------------------Listener / Interaction with DOM--------------------------------*/

// Get info from reservation form
let form = document.getElementById("reservationInfos");
form.addEventListener("submit", e => {
  let lastName = form.elements[0].value;
  let firstName = form.elements[1].value;
  let nameStation = form.elements[2].value;

  // Store infos in localStorage and sessionStorage
  localStorage.setItem("nom", lastName);
  localStorage.setItem("prenom", firstName);
  sessionStorage.setItem("StationChoosen", nameStation);

  // Open Canvas for signature
  htmlManager.hideButtonResa();
  htmlManager.blockClickOnMap();
  canvas = new Canvas(signPad);
  htmlManager.openCanvas();
  e.preventDefault();
});

// Cancel Sign
const cancelSign = document.getElementById("cancelSign");
cancelSign.addEventListener("click", e => {
  htmlManager.allowClickOnMap();
  sessionStorage.clear();
  canvas.eraseSign();
  htmlManager.closeCanvas();
  htmlManager.displayButtonResa();
});

//Confirmation resa after sign
const confirmButton = document.getElementById("confirmButton");

confirmButton.addEventListener("click", e => {
  if (canvas.isEmpty) {
    alert("merci de signer pour pouvoir réserver votre vélo");
  } else {
    htmlManager.allowClickOnMap();
    htmlManager.closeCanvas();
    htmlManager.disableReservation();
    htmlManager.displayButtonResa();

    // stock info resa dans navigator
    const lastName = localStorage.getItem("nom");
    const firstName = localStorage.getItem("prenom");
    const nameStation = sessionStorage.getItem("StationChoosen");

    // Initialisation reservation
    resa = new Reservation(lastName, firstName, nameStation);
    sessionStorage.setItem("isReserved", true);

    // Start Timer
    timer.startCountDown();
  }
});

// Cancel reservation
const cancelButton = document.getElementById("cancelButton");
cancelButton.addEventListener("click", e => {
  resa.cancelResa();
  htmlManager.hideInfoStation();
});

/* --------------------On page load--------------------------*/

// Get current duration to display reservation details  and reload timer
window.onload = function() {
  if (sessionStorage.getItem("isReserved") === "true") {
    // Get info resa from navigator
    const lastName = localStorage.getItem("nom");
    const firstName = localStorage.getItem("prenom");
    const nameStation = sessionStorage.getItem("StationChoosen");
    //duration=timestamp
    const currentDuration = sessionStorage.getItem("timesUp");

    // Display info resa
    resa = new Reservation(lastName, firstName, nameStation);
    // Reinit Canvas
    canvas = new Canvas(signPad);

    // Reload Timer
     // par rapport a date.now() calculer les nbres de secondes restantes et relancer le countdown 
   
    const newDuration = moment(currentDuration);
    timer.duration =Math.abs(moment().diff(newDuration,'seconds'));
    timer.startCountDown();
  }
  // Check if already info in browser and prefill form
  if (localStorage.getItem("nom") !== "") {
    const lastName = localStorage.getItem("nom");
    const firstName = localStorage.getItem("prenom");
    let form = document.getElementById("reservationInfos");
    form.elements[0].value = lastName;
    form.elements[1].value = firstName;
  }
};
