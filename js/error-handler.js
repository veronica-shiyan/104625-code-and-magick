'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var userDialog = document.querySelector('.setup');

  window.errorHandler = function (errorMessage) {
    var element = document.createElement('div');
    var textElement = 'Данные потерялись в пути... \n Попробуйте еще раз немного позже. \n';
    element.style = 'z-index: 100; text-align: center; color: blue; background-color: violet;';
    element.style.position = 'absolute';
    element.style.width = '550px';
    element.style.paddingTop = '20px';
    element.style.paddingBottom = '20px';
    element.style.top = '40%';
    element.style.left = 'calc(50% - 275px)';
    element.style.fontSize = '26px';
    element.textContent = textElement + errorMessage;
    document.body.insertAdjacentElement('afterbegin', element);
    var setupClose = userDialog.querySelector('.setup-close');
    var closeElement = setupClose.cloneNode(true);
    closeElement.style.color = 'blue';
    closeElement.style.position = 'absolute';
    closeElement.style.top = '0';
    closeElement.style.right = '0';
    element.insertAdjacentElement('afterbegin', closeElement);

    var onCloseElementEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeMessage();
      }
    };
    var closeMessage = function () {
      element.style.display = 'none';
      document.removeEventListener('keydown', onCloseElementEscPress);
    };

    document.addEventListener('keydown', onCloseElementEscPress);

    closeElement.addEventListener('click', function () {
      closeMessage();
    });

    closeElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        closeMessage();
      }
    });
  };
})();
