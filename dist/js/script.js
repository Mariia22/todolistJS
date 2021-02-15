"use strict";

var toggleButton = document.querySelector('.header_switch');
var body = document.querySelector('body');
var input = document.querySelector('input');
var form = document.querySelector('form');
var todoItems = []; // toggle dark\light mode 

toggleButton.addEventListener('click', function () {
  if (body.classList.contains('light')) {
    body.classList.remove('light');
  } else {
    body.classList.add('light');
  }
}); //create new element

function addNewItem(text) {
  var todoItem = {
    text: text,
    id: new Date(),
    checked: false
  };
}

function addItemToArray(arr, item) {
  arr.push(item);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var text = input.value.trim();
  console.log(text);

  if (text !== ' ') {
    var todoItem = addNewItem(text);
    console.log(todoItem);
    addItemToArray(todoItems, todoItem);
    console.log(todoItems);
    input.value = ' ';
  }
});