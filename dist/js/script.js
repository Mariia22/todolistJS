"use strict";

var _toggleMode = _interopRequireDefault(require("./modules/toggleMode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

window.addEventListener('DOMContentLoaded', function () {
  console.log('rtyt');
  (0, _toggleMode["default"])();
});