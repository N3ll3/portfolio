/**
 *
 *Create one reservation
 * @class Reservation
 */
class Reservation {
  /**
   *
   *Initialisation reservation to show details of reservation
   * @param {string} lastname -
   * @param {string} firstname
   * @param {string} nameStation
   * @memberof Reservation
   */
  constructor(lastname, firstname, nameStation) {
    this.lastName = lastname;
    this.firstName = firstname;
    this.nameStation = nameStation;
    this.showDetails();
  }

  // Show info reservation
  showDetails() {
    const div = document.getElementById("resa");
    div.textContent = `Vélo réservé à la station ${this.nameStation} par ${
      this.lastName
    } ${this.firstName}.`;
    htmlManager.showButtonCancel();
  }

  cancelResa() {
    // Clear info navigator
    sessionStorage.clear();
    // Erase signature
    canvas.eraseSign();
    // Stop Timer and reinitialise duration
    timer.stopCountDown();
    timer.duration = 1200;
    htmlManager.deleteTimer();
    htmlManager.enableReservation();
    htmlManager.deleteReservationDetails();
    htmlManager.hideCancelButton();
  }
}
