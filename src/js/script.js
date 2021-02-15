const toggleButton = document.querySelector('.header_switch');
const body = document.querySelector('body');
const input = document.querySelector('input');
const form = document.querySelector('form');
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

//create new element
function addNewItem(text) {
    const todoItem = {
        text,
        id: new Date(),
        checked: false
    };
}

function addItemToArray(arr, item) {
    arr.push(item);
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    console.log(text);
    if (text !== ' ') {
        const todoItem = addNewItem(text);
        console.log(todoItem);
        addItemToArray(todoItems, todoItem);
        console.log(todoItems);
        input.value = ' ';
    }
});