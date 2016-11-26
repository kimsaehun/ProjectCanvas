window.onload = function() {
  // grab color blocks
  var colorBlocks = document.querySelectorAll(".color-block");

  // color schema
  var schema = new Vue({
    el: '#schema',
    data: {
      colorBlocks: colorBlocks,
      activeColorBlock: null
    },
    methods: {
      selectColor: function(event) {
        // deselect the current active color
        if (this.activeColorBlock != null) {
          this.activeColorBlock.classList.remove('active');
        }
        // select the color
        event.target.classList.add('active');
        this.activeColorBlock = event.target;
      }
    }
  });
}
