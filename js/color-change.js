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
  var coatColor;
  var eyesColor;

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  window.updateWizards = function () {
    window.render(window.wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var changeCoatColor = function () {
    var nextColor;
    myWizardCoat.addEventListener('click', function () {
      nextColor = window.util.getNextElement(nextColor ? nextColor : WIZARD_COAT_COLORS[0], WIZARD_COAT_COLORS);
      coatColorInput.value = nextColor;
      myWizardCoat.style[changeColorStyle[0]] = nextColor;
      coatColor = nextColor;
      window.debounce(window.updateWizards);
    });
  };
  var changeEyesColor = function () {
    var nextColor;
    myWizardEyes.addEventListener('click', function () {
      nextColor = window.util.getNextElement(nextColor ? nextColor : WIZARD_EYES_COLORS[0], WIZARD_EYES_COLORS);
      eyesColorInput.value = nextColor;
      myWizardEyes.style[changeColorStyle[0]] = nextColor;
      eyesColor = nextColor;
      window.debounce(window.updateWizards);
    });
  };
  var changeFireballColor = function () {
    var nextColor;
    myWizardFireball.addEventListener('click', function () {
      nextColor = window.util.getNextElement(nextColor ? nextColor : WIZARD_FIREBALL_COLORS[0], WIZARD_FIREBALL_COLORS);
      fireballColorInput.value = nextColor;
      myWizardFireball.style[changeColorStyle[1]] = nextColor;
    });
  };
  changeCoatColor();
  changeEyesColor();
  changeFireballColor();
})();
