window.onload = function() {
  // color schema
  var schema = new Vue({
    el: '#canvas-container',
    data: {
      activeColorBlock: null,
      activeColor: null,
      mouseDown: false,
      previousX: null,
      previousY: null,
      currentX: null,
      currentY: null,
    },
    computed: {
      colorBlocks: function() {
        return Array.prototype.slice.call(document.querySelectorAll(".color-block"));
      },
      numColorBlocks: function() {
        return this.colorBlocks.length;
      },
      canvas: function() {
        return document.getElementById("canvas");
      },
      context: function() {
        return this.canvas.getContext("2d");
      },
      canvasRect: function() {
        return this.canvas.getBoundingClientRect();
      },
    },
    methods: {
      selectColor: function(event) {
        if (this.activeColorBlock != null) {
          // deselect the current active color
          this.activeColorBlock.classList.remove('active');
        }
        // select the color
        this.activeColorBlock = event.target;
        this.activeColorBlock.classList.add('active');
        this.activeColor = window.getComputedStyle(this.activeColorBlock).getPropertyValue("background-color");
      },
      selectAbove: function() {
        // default selection
        if (this.activeColorBlock == null) {
          this.activeColorBlock = this.colorBlocks[0];
        }
        else {
          // deselect the current active color
          this.activeColorBlock.classList.remove('active');
          // get index of active color
          var activeIndex = this.colorBlocks.indexOf(this.activeColorBlock);
          // select the color block above
          this.activeColorBlock = this.colorBlocks[(activeIndex - 1 + this.numColorBlocks) % this.numColorBlocks ];
        }
        this.activeColorBlock.classList.add('active');
        this.activeColor = window.getComputedStyle(this.activeColorBlock).getPropertyValue("background-color");
      },
      selectBelow: function() {
        // default selection
        if (this.activeColorBlock == null) {
          this.activeColorBlock = this.colorBlocks[0];
        }
        else {
          // deselect the current active color
          this.activeColorBlock.classList.remove('active');
          // get index of active color
          var activeIndex = this.colorBlocks.indexOf(this.activeColorBlock);
          // select the color block below
          this.activeColorBlock = this.colorBlocks[(activeIndex + 1) % this.numColorBlocks ];
        }
        this.activeColorBlock.classList.add('active');
        this.activeColor = window.getComputedStyle(this.activeColorBlock).getPropertyValue("background-color");
      },
      draw: function(event) {
        // if mouse is down
        if (this.mouseDown) {
          // if active color is not null
          if (this.activeColor != null) {
            this.updateCoord(event);

            // draw on the canvas
            this.context.beginPath();
            this.context.moveTo(this.previousX, this.previousY);
            this.context.lineTo(this.currentX, this.currentY);
            this.context.strokeStyle = this.activeColor;
            this.context.lineWidth = 5;
            this.context.stroke();
            this.context.closePath();
          }
        }
      },
      updateCoord: function(event) {
        // get coordinants of mouse
        // http://stackoverflow.com/a/18053642 thanks to patriques
        var rect = canvas.getBoundingClientRect();
        var cursorX = event.clientX - rect.left;
        var cursorY = event.clientY - rect.top;

        if (this.previousX == null && this.previousY == null) {
          this.previousX = cursorX;
          this.previousY = cursorY;
        }
        else {
          this.previousX = this.currentX;
          this.previousY = this.currentY;
        }
        this.currentX = cursorX;
        this.currentY = cursorY;
      },
      paintOn: function() {
        this.mouseDown = true;
      },
      paintOff: function() {
        this.mouseDown = false;
      }
    }
  });
}
