'use strict';

(function () {
  var WIZARD_QUANTITY = 4;
  var userDialog = document.querySelector('.setup');
  window.wizards = [];

  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  var createWizardElements = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  window.render = function (data) {
    var takeNumber = window.wizards.length > WIZARD_QUANTITY ? WIZARD_QUANTITY : data.length;
    similarListElement.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      similarListElement.appendChild(createWizardElements(data[i]));
    }
  };

  var loadHandler = function (data) {
    window.wizards = data;
    window.updateWizards();
  };

  window.backend.load(loadHandler, window.errorHandler);
})();
