'use strict';

// функция load
(function () {
  window.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', url);
    xhr.send();
  };
})();

// вызов load
(function () {
  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    (function () {
      // отрисовка мелких изображений
      var similarListElemnt = document.querySelector('.pictures');
      var similarPictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture__link');

      var renderPicture = function (picture) {
        var pictureElement = similarPictureTemplate.cloneNode(true);

        pictureElement.querySelector('img').src = picture.url;
        pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
        pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;

        return pictureElement;
      };

      var fragment = document.createDocumentFragment();
      for (var i = 0; i < data.length; i++) {
        fragment.appendChild(renderPicture(data[i]));
      }
      similarListElemnt.appendChild(fragment);
    })();
  };

  window.load('https://js.dump.academy/kekstagram/data', onSuccess, onError);
})();


