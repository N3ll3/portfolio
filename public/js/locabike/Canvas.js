class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.started = false;
    this.initCanvas();
    this.canvasManager();
    this.isEmpty = true;
  }

  initCanvas() {
    this.context.lineJoin = "round";
    this.context.linewidth = 5;
    this.context.strokeStyle = "#000";
  }
  // clear Canvas
  eraseSign() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.isEmpty = true;
  }

  //on mouseDown
  beginSign(x, y) {
    this.started = true;
    this.context.beginPath();
    this.context.moveTo(x, y);
  }
  //on mouseUp : to stop the sign function and check if there is a signature
  endSign() {
    this.started = false;
    this.isEmpty = false;
  }

  //on mouseMove
  sign(x, y) {
    if (this.started == true) {
      this.context.lineTo(x, y);
      this.context.stroke();
    }
  }

  canvasManager() {
    const canvasRect = {
      top: this.canvas.getBoundingClientRect().top,
      left: this.canvas.getBoundingClientRect().left
    };

    this.canvas.addEventListener("mousedown", e => {
      this.beginSign(e.offsetX, e.offsetY);
    });
    this.canvas.addEventListener("mousemove", e => {
      this.sign(e.offsetX, e.offsetY);
    });
    this.canvas.addEventListener("mouseup", e => {
      this.endSign();
    });
    this.canvas.addEventListener("touchstart", e => {
      this.beginSign(
        e.touches[0].clientX - canvasRect.left,
        e.touches[0].clientY - canvasRect.top
      );
    });
    this.canvas.addEventListener("touchmove", e => {
      e.preventDefault();
      this.sign(
        e.touches[0].clientX - canvasRect.left,
        e.touches[0].clientY - canvasRect.top
      );
    });
    this.canvas.addEventListener("touchend", e => {
      this.endSign();
    });
    const eraseButton = document.getElementById("eraseButton");
    eraseButton.addEventListener("click", e => {
      this.eraseSign();
    });
  }
}
