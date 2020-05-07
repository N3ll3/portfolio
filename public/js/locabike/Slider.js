class Slider {
  /**
   *Creates an instance of Slider.
   * @param {div where the slider will be} container
   * create slider + navigation
   * manage auto play
   * @memberof Slider
   */
  constructor(container) {
    this.indexSlide = 0;
    this.createSliderContent(container);
    this.createNavigation(container);
    this.interval;
    this.autoPlay();
  }

  /*Get elemts of slider in slider container */
  createSliderContent(container) {
    const sliderContent = htmlManager.createDivWithId("sliderContent");
    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");
    container.appendChild(prevButton);
    container.appendChild(sliderContent);
    container.appendChild(nextButton);

    let slidesCollection = document.getElementsByTagName("figure");
    let slidesElmt = [].slice.call(slidesCollection);
    /* add class 'slide' to each element*/
    slidesElmt.map(element => {
      element.classList.add("slide");
      sliderContent.appendChild(element);
      return element;
    });
    /* first one is active*/
    slidesElmt[0].className = "active";
  }
  /* get elmt of navigation in container*/
  createNavigation(container) {
    const buttonContainer = htmlManager.createDivWithClass("buttonContainer");
    const playButton = document.getElementById("playButton");
    const stopButton = document.getElementById("stopButton");

    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");

    buttonContainer.appendChild(prevButton);
    buttonContainer.appendChild(stopButton);
    buttonContainer.appendChild(playButton);
    buttonContainer.appendChild(nextButton);

    container.appendChild(buttonContainer);

    /* Manage click */
    nextButton.addEventListener("click", () => this.nextSlide());
    prevButton.addEventListener("click", () => this.prevSlide());
    stopButton.addEventListener("click", () => this.stopSlider());
    playButton.addEventListener("click", () => this.autoPlay());

    // Manage KeyDown
    window.addEventListener(
      "keydown",
      e => {
        switch (e.key) {
          case "ArrowLeft":
            this.prevSlide();
            break;
          case "ArrowRight":
            this.nextSlide();
            break;
        }
      },
      true
    );
  }

  autoPlay() {
    this.interval = setInterval(() => this.nextSlide(), 5000);
  }

  stopSlider() {
    clearInterval(this.interval);
  }

  nextSlide() {
    let slides = document.getElementsByTagName("figure");
    let currentSlide = slides[this.indexSlide];
    this.indexSlide++;
    if (this.indexSlide < slides.length) {
      let newSlide = slides[this.indexSlide];
      newSlide.className = "active";
      currentSlide.className = "slide";
    } else if (this.indexSlide >= slides.length) {
      this.indexSlide = 0;
      slides[0].className = "active";
      currentSlide.className = "slide";
    }
  }

  prevSlide() {
    let slides = document.getElementsByTagName("figure");
    let currentSlide = slides[this.indexSlide];
    this.indexSlide--;

    if (this.indexSlide >= 0) {
      let newSlide = slides[this.indexSlide];
      newSlide.className = "active";
      currentSlide.className = "slide";
    } else if ((this.indexSlide = -1)) {
      this.indexSlide = slides.length - 1;
      slides[this.indexSlide].className = "active";
      currentSlide.className = "slide";
    }
  }
}
