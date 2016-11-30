window.onload = function() {
  // color schema
  var schema = new Vue({
    el: '#canvas-container',
    data: {
      activeColorBlock: null,
      activeColor: null,
      mouseDown: false
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
            // get coordinants of mouse
            // http://stackoverflow.com/a/18053642 thanks to patriques
            var rect = canvas.getBoundingClientRect();
            var cursorX = event.clientX - rect.left;
            var cursorY = event.clientY - rect.top;

            // draw a rectangle on coordinants
            this.context.fillStyle = this.activeColor;
            this.context.fillRect(cursorX - 5, cursorY - 5, 10, 10);
          }
        }
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
