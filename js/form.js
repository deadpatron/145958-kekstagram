'use strict';

(function () {
  // вывод загруженного изображения
  var upload = document.querySelector('#upload-file');
  var uploadImgOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');
  var changeElement = null;
  var onImgOverlayChange = function () {
    if (changeElement) {
      uploadImgOverlay.classList.add('hidden');
    }
    changeElement = uploadImgOverlay.classList.remove('hidden');
  };

  upload.addEventListener('change', onImgOverlayChange);
  uploadCancel.addEventListener('click', function () {
    uploadImgOverlay.classList.add('hidden');
  });
  // скрытие по клаише esc
  var onCloseKeydown = function (evt) {
    if (evt.keyCode === 27) {
      uploadImgOverlay.classList.add('hidden');
    }
  };
  document.addEventListener('keydown', onCloseKeydown);

  // Работа с фильтром изображения
  var scale = document.querySelector('.scale');
  var imgPreview = document.querySelector('.img-upload__preview');
  var effectsList = document.querySelector('.effects__list');
  var currentEffect = null;
  var effect = null;
  var getFilterClick = function () {
    imgPreview.style.filter = null;
    imgPreview.classList.remove(currentEffect);
    effect = document.querySelector('.effects__radio:checked').value;
    if (effect === 'none') {
      scale.classList.add('hidden');
    } else {
      scale.classList.remove('hidden');
    }
    currentEffect = 'effects__preview--' + effect;
    imgPreview.classList.add(currentEffect);
  };

  var scaleLine = document.querySelector('.scale__line');
  var scalePin = document.querySelector('.scale__pin');
  var scaleLavel = document.querySelector('.scale__level');

  var getFilterMousedownd = function (evt) {
    evt.preventDefault();

    var startPoint = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startPoint.x - moveEvt.clientX,
      };

      startPoint = {
        x: moveEvt.clientX
      };
      if (scalePin.offsetLeft - shift.x >= scaleLine.offsetWidth) {
        scalePin.style.left = scaleLine.offsetWidth + 'px';
      } else if (scalePin.offsetLeft - shift.x <= 0) {
        scalePin.style.left = 0 + 'px';
      } else {
        scalePin.style.left = (scalePin.offsetLeft - shift.x) + 'px';
      }
      scaleLavel.style.width = scalePin.style.left;
    };

    var changeFilterMouseup = function () {
      var scaleValue = Math.ceil(scalePin.offsetLeft * 100 / scaleLine.offsetWidth);
      switch (effect) {
        case 'chrome':
          imgPreview.style.filter = 'grayscale(' + scaleValue / 100 + ')';
          break;
        case 'sepia':
          imgPreview.style.filter = 'sepia(' + scaleValue / 100 + ')';
          break;
        case 'marvin':
          imgPreview.style.filter = 'invert(' + scaleValue + '%)';
          break;
        case 'phobos':
          imgPreview.style.filter = 'blur(' + scaleValue * 0.03 + 'px)';
          break;
        case 'heat':
          imgPreview.style.filter = 'brightness(' + (scaleValue * 0.02 + 1) + ')';
          break;
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', changeFilterMouseup);
  };
  effectsList.addEventListener('click', getFilterClick);
  scalePin.addEventListener('mousedown', getFilterMousedownd);

/* вернусь позже (волидация хештегов)
var inputHashtags = document.querySelector('.img-upload__submit');
var checkHashtagInput = function (evt) {
  var textHashtags = document.querySelector('input[name="hashtags"]').value;
  var arrHashtags = textHashtags.split(' ');
  var maxLengthHashtag = 20;
  var tooLongHashtag = evt.target;
  for (var i = 0; i < arrHashtags.length; i++) {
    if (arrHashtags[i].length > maxLengthHashtag) {
      inputHashtags.validity.valid = false;
      tooLongHashtag.setCustomValidity('Максимальная длина хештега не должна превышать 20 символов');
    }
  }
};

inputHashtags.addEventListener('input', checkHashtagInput);
*/
})();
