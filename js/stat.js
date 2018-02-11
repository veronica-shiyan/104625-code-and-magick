'use strict';

(function () {
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var COLUMN_WIDTH = 40;
  var COLUMN_HEIGHT = 150;
  var COLUMN_RIGHT_MARGIN = 50;
  var LEFT_PADDING = 50;
  var TOP_PADDING = 20;
  var LINE_HEIGHT = 16;

  var COLUMN_TOP_MARGIN = TOP_PADDING * 2 + LINE_HEIGHT * 2;
  var BOTTOM_PADDING = CLOUD_HEIGHT - TOP_PADDING / 2;

  window.renderStatistics = function (ctx, names, times) {
    window.util.renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    window.util.renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    var maxTime = window.util.getMaxElement(times);

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', CLOUD_X + LEFT_PADDING, TOP_PADDING + LINE_HEIGHT);
    ctx.fillText('Список результатов:', CLOUD_X + LEFT_PADDING, TOP_PADDING * 2 + LINE_HEIGHT);

    for (var i = 0; i < names.length; i++) {
      ctx.fillText(Math.round(times[i]), CLOUD_X + LEFT_PADDING + (COLUMN_RIGHT_MARGIN + COLUMN_WIDTH) * i, CLOUD_Y + COLUMN_TOP_MARGIN + COLUMN_HEIGHT - (COLUMN_HEIGHT * times[i]) / maxTime);
      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
      }

      ctx.fillRect(CLOUD_X + LEFT_PADDING + (COLUMN_RIGHT_MARGIN + COLUMN_WIDTH) * i, CLOUD_Y + COLUMN_TOP_MARGIN + TOP_PADDING / 2 + COLUMN_HEIGHT - (COLUMN_HEIGHT * times[i]) / maxTime, COLUMN_WIDTH, (COLUMN_HEIGHT * times[i]) / maxTime);
      ctx.fillStyle = '#000';
      ctx.fillText(names[i], CLOUD_X + LEFT_PADDING + (COLUMN_RIGHT_MARGIN + COLUMN_WIDTH) * i, BOTTOM_PADDING);
    }
  };
})();

