'use strict';

(function () {
  var WIZARD_QUANTITY = 4;
  var userDialog = document.querySelector('.setup');

  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  var createWizardElements = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var loadHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    var wizardsArr = [];
    for (var i = 0; i < wizards.length; i++) {
      wizardsArr[i] = createWizardElements(wizards[i]);
    }
    wizardsArr.sort(window.util.compareRandom);
    for (i = 0; i < WIZARD_QUANTITY; i++) {
      fragment.appendChild(wizardsArr[i]);
    }
    similarListElement.appendChild(fragment);
  };

  window.backend.load(loadHandler, window.errorHandler);
})();

