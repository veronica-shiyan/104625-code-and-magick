'use strict';

(function () {
  window.util = {
    getRandomElement: function (elements) {
      return elements[Math.floor(Math.random() * elements.length)];
    },
    getNextElement: function (currentElement, elements) {
      var index = elements.indexOf(currentElement);
      index++;
      if (index === elements.length) {
        index = 0;
      }
      return elements[index];
    },
    getMaxElement: function (arr) {
      var maxElement = arr[0];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] > maxElement) {
          maxElement = arr[i];
        }
      }
      return maxElement;
    },
    renderCloud: function (ctx, x, y, color) {
      var CLOUD_WIDTH = 420;
      var CLOUD_HEIGHT = 270;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
    },
    compareRandom: function () {
      return Math.random() - 0.5;
    }
  };
})();
