'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_QUANTITY = 4;

var userDialog = document.querySelector('.setup');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var createWizardsData = function (quantity) {
  var wizards = [];
  for (var i = 0; i < quantity; i++) {
    wizards[i] = {
      name: WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)] + ' ' + WIZARD_SECOND_NAMES[Math.floor(Math.random() * WIZARD_SECOND_NAMES.length)],
      coatColor: WIZARD_COAT_COLORS[Math.floor(Math.random() * WIZARD_COAT_COLORS.length)],
      eyesColor: WIZARD_EYES_COLORS[Math.floor(Math.random() * WIZARD_EYES_COLORS.length)]
    };
  }
  return wizards;
};

var createWizardElements = function (wizards) {
  var wizardElements = [];
  for (var i = 0; i < wizards.length; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;

    wizardElements[i] = wizardElement;
  }
  return wizardElements;
};

var renderWizards = function (wizardElements) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizardElements.length; i++) {
    fragment.appendChild(wizardElements[i]);
  }
  similarListElement.appendChild(fragment);
};

var wizards = createWizardsData(WIZARD_QUANTITY);
var wizardElements = createWizardElements(wizards);
renderWizards(wizardElements);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

// Работа с событиями
// Реализация механизма открытия/закрытия модального окна
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var setupInput = userDialog.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupInput.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});

// Смена цветов персонажа по клику
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var myWizard = userDialog.querySelector('.wizard');
var myWizardCoat = myWizard.querySelector('.wizard-coat');
var myWizardEyes = myWizard.querySelector('.wizard-eyes');
var myWizardFireball = userDialog.querySelector('.setup-fireball-wrap');
var colorCurrentCoat = WIZARD_COAT_COLORS[0];
var colorCurrentEyes = WIZARD_EYES_COLORS[0];
var colorCurrentFireball = WIZARD_FIREBALL_COLORS[0];
var coatColorInput = userDialog.querySelector('input[name=coat-color]');
var eyesColorInput = userDialog.querySelector('input[name=eyes-color]');
var fireballColorInput = userDialog.querySelector('input[name=fireball-color]');
var changeColorStyle = ['fill', 'background'];

/* Перебор цветов в случайном порядке
 myWizardCoat.addEventListener('click', function () {
 myWizardCoat.style.fill = WIZARD_COAT_COLORS[Math.floor(Math.random() * WIZARD_COAT_COLORS.length)];
 });

 myWizardEyes.addEventListener('click', function () {
 myWizardEyes.style.fill = WIZARD_EYES_COLORS[Math.floor(Math.random() * WIZARD_EYES_COLORS.length)];
 });

 myWizardFireball.addEventListener('click', function () {
 myWizardFireball.style.backgroundColor = WIZARD_FIREBALL_COLORS[Math.floor(Math.random() * WIZARD_FIREBALL_COLORS.length)];
 }); */

// Перебор цветов последовательно
var changeColor = function (myWizardElement, elementArr, currentElementColor, changeStyle, ElementColorInput) {
  myWizardElement.addEventListener('click', function () {
    var colorNumber = elementArr.indexOf(currentElementColor);
    colorNumber++;
    if (colorNumber === elementArr.length) {
      colorNumber = 0;
    }
    currentElementColor = elementArr[colorNumber];
    ElementColorInput.value = currentElementColor;
    myWizardElement.style.changeStyle = elementArr[colorNumber];
  });
};

changeColor(myWizardCoat, WIZARD_COAT_COLORS, colorCurrentCoat, changeColorStyle[0], coatColorInput);
changeColor(myWizardEyes, WIZARD_EYES_COLORS, colorCurrentEyes, changeColorStyle[0], eyesColorInput);
changeColor(myWizardFireball, WIZARD_FIREBALL_COLORS, colorCurrentFireball, changeColorStyle[1], fireballColorInput);

// dialog.js
var dialogHandle = userDialog.querySelector('.upload');

dialogHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
    userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        dialogHandle.removeEventListener('click', onClickPreventDefault);
      };
      dialogHandle.addEventListener('click', onClickPreventDefault);
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// setup.js

var shopElement = document.querySelector('.setup-artifacts-shop');
var draggedItem = null;

var dragStartHandler = function (evt) {
  if (evt.target.tagName.toLowerCase() === 'img') {
    draggedItem = evt.target;
    evt.dataTransfer.setData('text/plain', evt.target.alt);
  }
};

shopElement.addEventListener('dragstart', dragStartHandler);

var artifactsElement = document.querySelector('.setup-artifacts');

artifactsElement.addEventListener('dragover', function (evt) {
  evt.preventDefault();
  return false;
});

artifactsElement.addEventListener('drop', function (evt) {
  evt.target.style.backgroundColor = '';
  var star = draggedItem.cloneNode(true);
  if (evt.target.tagName.toLowerCase() !== 'img') {
    evt.target.appendChild(star);
    star.removeAttribute('draggable');
    star.removeEventListener('dragstart', dragStartHandler);
  }
  evt.preventDefault();
});

artifactsElement.addEventListener('dragenter', function (evt) {
  if (evt.target.tagName.toLowerCase() !== 'img') {
    evt.target.style.backgroundColor = 'yellow';
  } else {
    evt.target.style.backgroundColor = 'red';
  }
  evt.preventDefault();
});

artifactsElement.addEventListener('dragleave', function (evt) {
  evt.target.style.backgroundColor = '';
  evt.preventDefault();
});
