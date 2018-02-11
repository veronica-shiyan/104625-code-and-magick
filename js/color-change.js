'use strict';
(function () {
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var userDialog = document.querySelector('.setup');
  var myWizard = userDialog.querySelector('.wizard');
  var myWizardCoat = myWizard.querySelector('.wizard-coat');
  var myWizardEyes = myWizard.querySelector('.wizard-eyes');
  var myWizardFireball = userDialog.querySelector('.setup-fireball-wrap');
  var coatColorInput = userDialog.querySelector('input[name=coat-color]');
  var eyesColorInput = userDialog.querySelector('input[name=eyes-color]');
  var fireballColorInput = userDialog.querySelector('input[name=fireball-color]');
  var changeColorStyle = ['fill', 'background'];

  var changeColor = function (myWizardElement, elementArr, currentElementColor, changeStyle, elementColorInput) {
    var nextColor;
    myWizardElement.addEventListener('click', function () {
      nextColor = window.util.getNextElement(nextColor ? nextColor : currentElementColor, elementArr);
      elementColorInput.value = nextColor;
      myWizardElement.style[changeStyle] = nextColor;
    });
  };

  changeColor(myWizardCoat, WIZARD_COAT_COLORS, WIZARD_COAT_COLORS[0], changeColorStyle[0], coatColorInput);
  changeColor(myWizardEyes, WIZARD_EYES_COLORS, WIZARD_EYES_COLORS[0], changeColorStyle[0], eyesColorInput);
  changeColor(myWizardFireball, WIZARD_FIREBALL_COLORS, WIZARD_FIREBALL_COLORS[0], changeColorStyle[1], fireballColorInput);
})();
