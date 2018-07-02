'use strict';


var getUrl = function (postsValue) {
  var url = [];
  for (var i = 1; i <= postsValue; i++) {
    url.push('photos/' + i + '.jpg');
  }
  return url;
};

var getLikes = function () {
  var maxLikes = 200;
  var minLikes = 15;
  var likesValue = Math.floor(Math.random() * maxLikes);
  if (likesValue < minLikes) {
    likesValue = minLikes;
  }
  return likesValue;
};


var getComments = function () {
  var comments = [];
  var commentsArray = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
    'В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают.',
    'Как можно было поймать такой неудачный момент?!'
  ];
  comments.push(commentsArray[Math.floor(Math.random() * commentsArray.length)]);
  if (Math.random() < 0.5) {
    comments.push(commentsArray[Math.floor(Math.random() * commentsArray.length)]);
  }
  return comments;
};

var getDescription = function () {
  var descriptionArray = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье.',
    'Цените тех, кто рядом с вами и отгоняйте все сомненья.',
    'Не обижайте всех словами......',
    'Вот это тачка!'
  ];
  return descriptionArray[Math.floor(Math.random() * descriptionArray.length)];
};

var posts = [];
var createPosts = function (postsValue) {
  for (var i = 0; i < postsValue; i++) {
    posts.push({
      url: getUrl(postsValue)[i],
      likes: getLikes(),
      comments: getComments(),
      description: getDescription()});
  }
  return posts;
};
createPosts(25);

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
for (var i = 0; i < posts.length; i++) {
  fragment.appendChild(renderPicture(posts[i]));
}
similarListElemnt.appendChild(fragment);

var renderBigPicture = document.querySelector('.big-picture');
// renderBigPicture.classList.remove('hidden');
renderBigPicture.querySelector('.big-picture__img').src = posts[0].url;
renderBigPicture.querySelector('.likes-count').textContent = posts[0].likes;
renderBigPicture.querySelector('.comments-count').textContent = posts[0].comments.length;

var avatarArray = renderBigPicture.querySelectorAll('.social__comment .social__picture');
for (var avatarIndex = 0; avatarIndex < avatarArray.length; avatarIndex++) {
  avatarArray[avatarIndex].src = 'img/avatar-' + Math.ceil(Math.random() * 5) + '.svg';
}

var commentsArray = renderBigPicture.querySelectorAll('.social__comments .social__text');
for (var commentIndex = 0; commentIndex < commentsArray.length; commentIndex++) {
  commentsArray[commentIndex].textContent = posts[Math.floor(Math.random() * posts.length)].comments.join(' ');
}

renderBigPicture.querySelector('.social__caption').textContent = posts[0].description;
document.querySelectorAll('.social__comment-count, .social__loadmore')
  .forEach(function (item) {
    item.classList.add('visually-hidden');
  });

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

var scaleLineWidth = document.querySelector('.scale__line');
var scalePinPosition = document.querySelector('.scale__pin');
var scaleLavelWidth = document.querySelector('.scale__level');
var scale = document.querySelector('.scale');
var effect = document.querySelector('.effects__radio');
var imgPreview = document.querySelector('.img-upload__preview');
var changeScaleMouseUp = function () {
  var scaleValue = scalePinPosition.offsetLeft * 100 / scaleLineWidth;
  if (effect.id === 'effect-none') {
    scale.classList.add('hidden');
  }
  if (effect.id === 'effect-chrome') {
    imgPreview.style.filter = 'grayscale(' + scaleValue + ')';
    scaleLavelWidth.style.width = scaleValue + '%';
  }
};
scalePinPosition.addEventListener('mouseUp', changeScaleMouseUp);
