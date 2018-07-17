'use strict';

// Тестовые данные

(function () {
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

  window.posts = [];
  var createPosts = function (postsValue) {
    for (var i = 0; i < postsValue; i++) {
      window.posts.push({
        url: getUrl(postsValue)[i],
        likes: getLikes(),
        comments: getComments(),
        description: getDescription()});
    }
    return window.posts;
  };
  createPosts(25);
})();
