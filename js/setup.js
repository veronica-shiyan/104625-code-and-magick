'use strict';

(function () {
  document.querySelector('.setup-similar').classList.remove('hidden');
  window.renderWizard();

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var draggedItem = null;

  var dragStartHandler = function (evt) {
    artifactsElement.style.outline = '2px dashed red';
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target.cloneNode(true);
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  };

  shopElement.addEventListener('dragstart', dragStartHandler);

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    if (evt.target.tagName.toLowerCase() !== 'img') {
      draggedItem.removeAttribute('draggable');
      draggedItem.removeEventListener('dragstart', dragStartHandler);
      evt.target.appendChild(draggedItem);
    }
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    artifactsElement.style.outline = '';
    if (evt.target.tagName.toLowerCase() !== 'img') {
      evt.target.style.backgroundColor = 'yellow';
    } else {
      evt.target.style.backgroundColor = 'red';
      evt.target.style.borderBottom = '12px solid red';
    }
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.style.borderBottom = '';
    evt.preventDefault();
  });
})();
