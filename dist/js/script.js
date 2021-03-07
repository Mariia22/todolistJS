"use strict";

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

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
  localStorage.setItem = ('todoItems', JSON.stringify(todoItems));
  var item = document.querySelector("[data-key='".concat(todoItem.id, "']"));
  var node = document.createElement('li');
  var isChecked = todoItem.checked ? '-done' : '';
  node.setAttribute('data-key', todoItem.id);
  node.setAttribute('class', "todo_item".concat(isChecked));
  node.innerHTML = "\n    <input id=\"".concat(todoItem.id, "\" type=\"checkbox\"/>\n    <label for=\"").concat(todoItem.id, "\" class=\"todo_item_label\"></label>\n    <span>").concat(todoItem.text, "</span>");

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
} //fill new element


form.addEventListener('submit', function (e) {
  e.preventDefault();
  var text = input.value.trim();

  if (text !== '') {
    addNewItem(text, todoItems);
    input.value = '';
    input.focus();
  }
}); //toggle chekbox

list.addEventListener('click', function (event) {
  if (event.target.classList.contains('todo_item_label')) {
    var itemKey = event.target.parentElement.dataset.key;
    toggleCheckbox(itemKey);
  }
});

function toggleCheckbox(key) {
  var index = todoItems.findIndex(function (todoItem) {
    return todoItem.id === Number(key);
  });
  todoItems[index].checked = !todoItems[index].checked;
  console.log(todoItems[index]);
  renderItem(todoItems[index]);
} //localStorage 


document.addEventListener('DOMContentLoaded', function () {
  var ref = localStorage.getItem('todoItems');

  if (ref) {
    todoItems = (_readOnlyError("todoItems"), JSON.parse(ref));
    todoItems.forEach(function (item) {
      return renderItem(item);
    });
  }
});