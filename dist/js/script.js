"use strict";

var toggleButton = document.querySelector('.header_switch');
var body = document.querySelector('body');
toggleButton.addEventListener('click', function () {
  if (body.classList.contains('light')) {
    body.classList.remove('light');
  } else {
    body.classList.add('light');
  }
});