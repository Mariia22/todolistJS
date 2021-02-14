"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var toggleMode = function toggleMode() {
  var toggleButton = document.querySelector('.header_switch');
  var body = document.querySelector('body');
  toggleButton.addEventListener('click', function () {
    if (body.classList.contains('light')) {
      body.classList.remove('light');
    } else {
      body.classList.add('light');
    }
  });
};

var _default = toggleMode;
exports["default"] = _default;