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

//create new element and add to array
function addNewItem(text, arr) {
    const todoItem = {
        text,
        id: new Date(),
        checked: false
    };
    arr.push(todoItem);
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

//render element
function renderItem() {

}