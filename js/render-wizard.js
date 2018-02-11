'use strict';

(function () {
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
        name: window.util.getRandomElement(WIZARD_NAMES) + ' ' + window.util.getRandomElement(WIZARD_SECOND_NAMES),
        coatColor: window.util.getRandomElement(WIZARD_COAT_COLORS),
        eyesColor: window.util.getRandomElement(WIZARD_EYES_COLORS)
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

  var displayWizards = function (wizardElements) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizardElements.length; i++) {
      fragment.appendChild(wizardElements[i]);
    }
    similarListElement.appendChild(fragment);
  };

  var wizards = createWizardsData(WIZARD_QUANTITY);
  var wizardElements = createWizardElements(wizards);

  window.renderWizard = function () {
    displayWizards(wizardElements);
  };
})();

