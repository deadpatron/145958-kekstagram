'use strict';


// Отрисовка большого изображения
// Заменить на реальные значения
(function () {
  var renderBigPicture = document.querySelector('.big-picture');
  renderBigPicture.querySelector('.big-picture__img').src = window.posts[0].url;
  renderBigPicture.querySelector('.likes-count').textContent = window.posts[0].likes;
  renderBigPicture.querySelector('.comments-count').textContent = window.posts[0].comments.length;

  var avatarArray = renderBigPicture.querySelectorAll('.social__comment .social__picture');
  for (var avatarIndex = 0; avatarIndex < avatarArray.length; avatarIndex++) {
    avatarArray[avatarIndex].src = 'img/avatar-' + Math.ceil(Math.random() * 5) + '.svg';
  }

  var commentsArray = renderBigPicture.querySelectorAll('.social__comments .social__text');
  for (var commentIndex = 0; commentIndex < commentsArray.length; commentIndex++) {
    commentsArray[commentIndex].textContent = window.posts[Math.floor(Math.random() * window.posts.length)].comments.join(' ');
  }

  renderBigPicture.querySelector('.social__caption').textContent = window.posts[0].description;
  document.querySelectorAll('.social__comment-count, .social__loadmore')
  .forEach(function (item) {
    item.classList.add('visually-hidden');
  });

  var pictures = document.querySelector('.pictures');
  var closeBigPicture = document.querySelector('.big-picture__cancel');
  var onGalleryClick = function (evt) {
    var target = evt.target;
    if (target.className !== 'picture__img') {
      return;
    }
    renderBigPicture.classList.remove('hidden');
  };
  var onCloseBigPictureClick = function () {
    renderBigPicture.classList.add('hidden');
  };
  var onCloseKeydown = function (evt) {
    if (evt.keyCode === 27) {
      renderBigPicture.classList.add('hidden');
    }
  };

  closeBigPicture.addEventListener('click', onCloseBigPictureClick);
  document.addEventListener('keydown', onCloseKeydown);
  pictures.addEventListener('click', onGalleryClick);
})();

