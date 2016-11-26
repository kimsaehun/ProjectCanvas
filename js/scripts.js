window.onload = function() {
  // color schema
  var schema = new Vue({
    el: '#schema-wrapper',
    data: {
      activeColorBlock: null
    },
    computed: {
      colorBlocks: function() {
        return Array.prototype.slice.call(document.querySelectorAll(".color-block"));
      },
      numColorBlocks: function() {
        return this.colorBlocks.length;
      }
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
      }
    }
  });
}
