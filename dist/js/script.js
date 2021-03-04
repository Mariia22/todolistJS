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
    id: Date.now(),
    checked: false
  };
  renderItem(todoItem);
  arr.push(todoItem);
} //render element


function renderItem(todoItem) {
  var item = document.createElement('li');
  var isChecked = todoItem.checked ? 'done' : '';
  item.setAttribute('data-key', todoItem.id);
  item.setAttribute('class', "todo_item".concat(isChecked));
  item.innerHTML = "\n    <input id=\"".concat(todoItem.id, "\" type=\"checkbox\"/>\n    <label for=\"").concat(todoItem.id, "\" class=\"todo_item_label\"></label>\n    <span>").concat(todoItem.text, "</span>");
  list.append(item);
} //fill new element


form.addEventListener('submit', function (e) {
  e.preventDefault();
  var text = input.value.trim();

  if (text !== ' ') {
    addNewItem(text, todoItems);
    input.value = ' ';
  }
});