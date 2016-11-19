window.onload = function() {
  // Grab the canvas element and its context.
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  // set the canvas width and height
  canvas.width = 384; 
  canvas.height = 216;

  // Paint an image to the canvas
  var img = new Image();
  img.onload = function() {
    console.log("I've been called! I shall now draw my image!");
    ctx.drawImage(this, 0, 0);
  }
  img.src = "res/music.png";
}