class Timer {
  /**
   *Creates an instance of Timer.
   * @param {number} duration in ms
   */

  constructor(duration) {
    this.seconds;
    this.minutes;
    this.showTimer = document.getElementById("timer");
    this.timerInterval;
    // init timer 1200 secondes ou date timesUp  si deja reservé
    this.duration = duration;
  }

  // convert duration in Minutes and Second for lisible timer
  convertInTime() {
    this.minutes = Math.floor(this.duration / 60);
    this.seconds = this.duration - this.minutes * 60;
  }

  countdown() {
    this.duration -= 1;
    this.convertInTime();
    if (this.seconds < 0) {
      this.minutes -= 1;
      this.seconds = 59;
    }

    if (this.seconds < 10) {
      this.showTimer.textContent = `Temps restant : ${this.minutes} min 0${
        this.seconds
      } sec`;
    } else {
      this.showTimer.textContent = `Temps restant : ${this.minutes} min ${
        this.seconds
      } sec`;
    }

    if ((this.minutes === 0) & (this.seconds === 0)) {
      resa.cancelResa();
    }
  }

  startCountDown() {
    if(this.duration == 1200){
      const timesUp = moment().add(20, 'm').toDate();
      sessionStorage.setItem("timesUp", timesUp);
    } 
    this.timerInterval = setInterval(() => this.countdown(), 1000);
  }

  stopCountDown() {
    clearInterval(this.timerInterval);
  }
}
