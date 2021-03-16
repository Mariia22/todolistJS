"use strict";

var toggleButton = document.querySelector('.header_switch');
var body = document.querySelector('body');
var input = document.querySelector('input');
var form = document.querySelector('form');
var list = document.querySelector('.todo_list');
var total = document.querySelector('.todo_total_items');
var deleteButton = document.querySelector('.todo_total_completed');
var filter = document.querySelector('.todo_sort');
var filterItems = document.querySelectorAll('.todo_sort_item');
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
    checked: false,
    deleted: false
  };
  renderItem(todoItem);
  arr.push(todoItem);
  localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));
} //render element


function renderItem(todoItem) {
  var item = document.querySelector("[data-key='".concat(todoItem.id, "']"));
  var node = document.createElement('li');
  var isChecked = todoItem.checked ? '-done' : '';
  node.setAttribute('data-key', todoItem.id);
  node.setAttribute('class', "todo_item".concat(isChecked));
  node.innerHTML = "\n    <input id=\"".concat(todoItem.id, "\" type=\"checkbox\"/>\n    <label for=\"").concat(todoItem.id, "\" class=\"todo_item_label\"></label>\n    <span>").concat(todoItem.text, "</span>");

  if (todoItem.deleted === true) {
    item.remove();
    return;
  }

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
    totalItems(todoItems);
    input.value = '';
    input.focus();
  }
}); //toggle chekbox

list.addEventListener('click', function (event) {
  if (event.target.classList.contains('todo_item_label')) {
    var itemKey = event.target.parentElement.dataset.key;
    toggleCheckbox(itemKey);
    totalItems(todoItems);
  }
});

function toggleCheckbox(key) {
  var index = todoItems.findIndex(function (todoItem) {
    return todoItem.id === Number(key);
  });
  todoItems[index].checked = !todoItems[index].checked;
  localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));
  renderItem(todoItems[index]);
} //localStorage 


document.addEventListener('DOMContentLoaded', function () {
  var ref = localStorage.getItem('todoItemsRef');

  if (ref) {
    todoItems = JSON.parse(ref);
    renderList(todoItems);
  }

  totalItems(todoItems);
}); // total items left

function totalItems(arr) {
  var totalElements = arr.reduce(function (acc, item) {
    if (item.checked === false) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
  total.innerHTML = "<span>".concat(totalElements, " items left</span>");
} //delete button


deleteButton.addEventListener('click', function () {
  deleteElements();
  renderList(todoItems);
  totalItems(todoItems);
  todoItems = todoItems.filter(function (todoItem) {
    return todoItem.deleted !== true;
  });
  localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));
});

function deleteElements() {
  for (var i = 0; i < todoItems.length; i++) {
    if (todoItems[i].checked === true) {
      todoItems[i].deleted = true;
    }
  }

  ;
} //render list


function renderList(arr) {
  arr.forEach(function (item) {
    renderItem(item);
  });
} //filter


filter.addEventListener('click', function (event) {
  if (!event.target.tagName === 'li') {
    return false;
  }

  var listItems = list.getElementsByTagName('li');
  var itemsLength = listItems.length;
  filterItems.forEach(function (item) {
    return item.classList.contains('todo_sort_item-active') ? item.classList.remove('todo_sort_item-active') : false;
  });

  if (event.target.classList.contains('active')) {
    event.target.classList.add('todo_sort_item-active');

    for (var i = 0; i < itemsLength; i++) {
      listItems[i].classList.remove('todo_item-hide');

      if (listItems[i].classList.contains('todo_item-done')) {
        listItems[i].classList.add('todo_item-hide');
      }
    }
  } else if (event.target.classList.contains('completed')) {
    event.target.classList.add('todo_sort_item-active');

    for (var _i = 0; _i < itemsLength; _i++) {
      listItems[_i].classList.remove('todo_item-hide');

      if (!listItems[_i].classList.contains('todo_item-done')) {
        listItems[_i].classList.add('todo_item-hide');
      }
    }
  } else {
    event.target.classList.add('todo_sort_item-active');

    for (var _i2 = 0; _i2 < itemsLength; _i2++) {
      listItems[_i2].classList.remove('todo_item-hide');
    }
  }
}); //drag and drop