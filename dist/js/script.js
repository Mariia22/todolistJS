"use strict";

var toggleButton = document.querySelector('.header_switch');
var body = document.querySelector('body');
var input = document.querySelector('input');
var form = document.querySelector('form');
var list = document.querySelector('.todo_list');
var todoItems = []; // toggle dark\light mode 

toggleButton.addEventListener('click', function () {
  if (body.classList.contains('light')) {
    body.classList.remove('light');
  } else {
    body.classList.add('light');
  }
}); //create new element and add to array

function addNewItem(text, arr) {
  var todoItem = {
    text: text,
    id: new Date(),
    checked: false
  };
  arr.push(todoItem);
} //render element


function renderItem(text) {
  var item = document.createElement('li');
  item.innerHTML = "".concat(text);
  list.append(item);
} //fill new element


form.addEventListener('submit', function (e) {
  e.preventDefault();
  var text = input.value.trim();

  if (text !== ' ') {
    addNewItem(text, todoItems);
    renderItem(text);
    input.value = ' ';
  }
});