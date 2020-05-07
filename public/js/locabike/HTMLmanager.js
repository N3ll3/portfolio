/**
 *
 *helper for DOM/CSS  manipulation not link to class
 * @class HTMLmanager
 */
class HTMLmanager {
  hide(elmt) {
    elmt.style.visibility = "hidden";
  }

  show(elmt) {
    elmt.style.visibility = "visible";
  }

  delete(elmt) {
    elmt.style.display = "none";
  }

  display(elmt) {
    elmt.style.display = "block";
  }

  deleteContent(elmt) {
    elmt.textContent = "";
  }

  hideInfoStation() {
    const showedDiv = document.getElementById("showed");
    this.hide(showedDiv);
  }
  openCanvas() {
    const divPad = document.getElementById("sign");
    this.show(divPad);
  }

  closeCanvas() {
    const divPad = document.getElementById("sign");
    this.hide(divPad);
  }

  hideButtonResa() {
    let buttonResa = document.getElementById("btnResa");
    this.delete(buttonResa);
  }

  displayButtonResa() {
    let buttonResa = document.getElementById("btnResa");
    this.display(buttonResa);
  }

  disableReservation() {
    const formulaire = document.getElementById("reservationInfos");
    let elmts = formulaire.elements;
    for (let i = 0; i < elmts.length; i++) {
      elmts[i].disabled = true;
    }
  }

  enableReservation() {
    const formulaire = document.getElementById("reservationInfos");
    let elmts = formulaire.elements;
    for (let i = 0; i < elmts.length; i++) {
      elmts[i].disabled = false;
    }
  }

  hideReservationDetails() {
    const div = document.getElementById("resa");
    this.delete(div);
  }

  hideTimer() {
    const div = document.getElementById("timer");
    this.delete(div);
  }

  deleteReservationDetails() {
    const div = document.getElementById("resa");
    this.deleteContent(div);
  }

  deleteTimer() {
    const div = document.getElementById("timer");
    this.deleteContent(div);
  }

  showButtonCancel() {
    const cancelButton = document.getElementById("cancelResa");
    this.show(cancelButton);
  }

  hideCancelButton() {
    const cancelButton = document.getElementById("cancelResa");
    this.hide(cancelButton);
  }

  blockClickOnMap() {
    const noClick = document.getElementById("noClick");
    noClick.style.zIndex = "10";
    noClick.style.backgroundColor = "#b0c6cb";
  }

  allowClickOnMap() {
    const noClick = document.getElementById("noClick");
    noClick.style.zIndex = "0";
    noClick.backgroundColor = "#b0c6cb";
    noClick.style.pointerEvents = "auto";
  }

  createDivWithClass(className) {
    let div = document.createElement("div");
    div.setAttribute("class", className);
    return div;
  }

  createDivWithId(id) {
    let div = document.createElement("div");
    div.setAttribute("id", id);
    return div;
  }
}
