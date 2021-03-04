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
    const item = document.createElement('li');
    const isChecked = todoItem.checked ? 'done' : '';
    item.setAttribute('data-key', todoItem.id);
    item.setAttribute('class', `todo_item${isChecked}`);
    item.innerHTML = `
    <input id="${todoItem.id}" type="checkbox"/>
    <label for="${todoItem.id}" class="todo_item_label"></label>
    <span>${todoItem.text}</span>`;
    list.append(item);
}

//fill new element
form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (text !== ' ') {
        addNewItem(text, todoItems);
        input.value = ' ';
    }
});

