const toggleButton = document.querySelector('.header_switch');
const body = document.querySelector('body');
const input = document.querySelector('input');
const form = document.querySelector('form');
const list = document.querySelector('.todo_list');
const todoItems = [];

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
    }
});

function toggleCheckbox(key) {
    const index = todoItems.findIndex(todoItem => todoItem.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
    console.log(todoItems[index]);
    renderItem(todoItems[index]);
}