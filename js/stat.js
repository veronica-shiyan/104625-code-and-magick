'use strict';

var CLOUD_WIDTH = 420;
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

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/* var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 320, y);
  ctx.quadraticCurveTo(x + 340, y - 15, x + 380, y - 5);
  ctx.quadraticCurveTo(x + 450, y + 20, x + 450, y + 100);
  ctx.quadraticCurveTo(x + 450, y + 100, x + 550, y + 120);
  ctx.quadraticCurveTo(x + 450, y + 120, x + 420, y + 220);
  ctx.lineTo(x + 420, y + 270);
  ctx.lineTo(x, y + 270);
  ctx.closePath();
  ctx.fill();
}; */

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var maxTime = getMaxElement(times);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + LEFT_PADDING, TOP_PADDING + LINE_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X + LEFT_PADDING, TOP_PADDING * 2 + LINE_HEIGHT);

  for (var i = 0; i < names.length; i++) {
    ctx.fillText(Math.round(times[i]), CLOUD_X + LEFT_PADDING + (COLUMN_RIGHT_MARGIN + COLUMN_WIDTH) * i, CLOUD_Y + COLUMN_TOP_MARGIN + COLUMN_HEIGHT - (COLUMN_HEIGHT * times[i]) / maxTime);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, '+ Math.random()+')';
    }

    ctx.fillRect(CLOUD_X + LEFT_PADDING + (COLUMN_RIGHT_MARGIN + COLUMN_WIDTH) * i, CLOUD_Y + COLUMN_TOP_MARGIN + TOP_PADDING / 2 + COLUMN_HEIGHT - (COLUMN_HEIGHT * times[i]) / maxTime, COLUMN_WIDTH, (COLUMN_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + LEFT_PADDING + (COLUMN_RIGHT_MARGIN + COLUMN_WIDTH) * i, BOTTOM_PADDING);
    }
  };
