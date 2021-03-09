const toggleButton = document.querySelector('.header_switch');
const body = document.querySelector('body');
const input = document.querySelector('input');
const form = document.querySelector('form');
const list = document.querySelector('.todo_list');
const total = document.querySelector('.todo_total_items');
const deleteButton = document.querySelector('.todo_total_completed');
let todoItems = [];

// toggle dark\light mode 
toggleButton.addEventListener('click', () => {
    if (body.classList.contains('light')) {
        body.classList.remove('light');
    }
    else {
        body.classList.add('light');
    }
});

//create new element and add to array
function addNewItem(text, arr) {
    const todoItem = {
        text,
        id: Date.now(),
        checked: false
    };
    renderItem(todoItem);
    arr.push(todoItem);
    localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));
}

//render element
function renderItem(todoItem) {
    const item = document.querySelector(`[data-key='${todoItem.id}']`);
    const node = document.createElement('li');
    const isChecked = todoItem.checked ? '-done' : '';
    node.setAttribute('data-key', todoItem.id);
    node.setAttribute('class', `todo_item${isChecked}`);
    node.innerHTML = `
    <input id="${todoItem.id}" type="checkbox"/>
    <label for="${todoItem.id}" class="todo_item_label"></label>
    <span>${todoItem.text}</span>`;
    if (item) {
        list.replaceChild(node, item);
    } else {
        list.append(node);
    }
}
//render list
function renderList(arr) {
    arr.forEach(item => {
        renderItem(item)
    });
}

//fill new element
form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (text !== '') {
        addNewItem(text, todoItems);
        input.value = '';
        input.focus();
    }
});

//toggle chekbox
list.addEventListener('click', event => {
    if (event.target.classList.contains('todo_item_label')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleCheckbox(itemKey);
        totalItems();
    }
});

function toggleCheckbox(key) {
    const index = todoItems.findIndex(todoItem => todoItem.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
    localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));
    renderItem(todoItems[index]);
}

//localStorage 
document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoItemsRef');
    if (ref) {
        todoItems = JSON.parse(ref);
        renderList(todoItems);
    }
    totalItems();
});

// total items left
function totalItems() {
    let totalElements = todoItems.reduce(function (acc, item) {
        if (item.checked === false) {
            return acc + 1;
        }
        else {
            return acc;
        }
    }, 0);
    total.innerHTML = `<span>${totalElements} items left</span>`;
}

//delete button
deleteButton.addEventListener('click', () => {
    deleteElements();
    renderList(todoItems);
    totalItems();
});

function deleteElements() {
    todoItems = todoItems.filter(item => {
        return item.checked === false
    });
}

