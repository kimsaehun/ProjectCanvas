window.onload = function() {
  var timer = new GlobalTimer();
  var points = 0;

  // grab the p element
  var msg = document.getElementById("msg");

  // grab the game container
  var container = document.getElementById("game-container");

  // Grab the canvas element and its context.
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  // give the timer the canvas
  timer.setCanvas(canvas);
  // give the timer the context tool for the canvas
  timer.setCanvasCtx(ctx);

  // give the canvas an on mouse down event
  // http://stackoverflow.com/questions/3799686/clicking-inside-canvas-element-selects-text
  canvas.onmousedown = function (event) {
    var img = new Image();
    img.src = "res/music.png";
    timer.images.push(img);
    timer.lifetimes.push(0);

    // get click location
    var relativeX = event.clientX - container.offsetLeft -canvas.offsetLeft;
    var relativeY = event.clientY - container.offsetTop - canvas.offsetTop;
    console.log('event: ' + event.clientX + ' ' + event.clientY);
    timer.locations.push(relativeX);
    timer.locations.push(relativeY);

    // add point
    points++;
    msg.innerHTML = points + " points";

    return false;
  }
}

/*
A global timer object used for updating the game.
Credit to /u/Apalapa
*/
GlobalTimer = function() {
  // an array to hold all the images on the canvas
  this.images = [];
  // an array to hold the opacity level of all the images
  this.lifetimes = [];
  // an array to hold the opacity level of all the images
  this.locations = [];

  this.timer = setInterval((function() {this.update();}).bind(this), 30);
  this.lastUpdate = Date.now();

  /*
  Gets time passed since last update, and updates now
  to last update.
  */
  this.getUpdateTime = function() {
    var passed = Date.now() - this.lastUpdate;
    this.lastUpdate = Date.now();
    return passed;
  }

  /*
  Function is called by the timer to do all updates in the game.
  */
  this.update = function() {
    //time since last update.
    var time = this.getUpdateTime();

    // clear the canvas
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw all the images
    for (var i = 0; i < this.images.length; i++) {
      this.ctx.drawImage(this.images[i], this.locations[i * 2], this.locations[i * 2 + 1]);
    }
    // update all the lifetimes. loop backwards since array is being modified
    for (var i = this.lifetimes.length - 1; i >= 0; i--) {
      this.lifetimes[i] += time;
      // if an image has lived for over a second
      if (this.lifetimes[i] > 1000) {
        // remove the image
        this.images.splice(i, 1);
        // remove the lifetime
        this.lifetimes.splice(i, 1);
        // remove the location
        this.locations.splice(i, 2);
      }
    }
  }

  this.setCanvas = function(canvas) {
    this.canvas = canvas;
  }

  this.setCanvasCtx = function(ctx) {
    this.ctx = ctx;
  }
}