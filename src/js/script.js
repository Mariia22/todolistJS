const toggleButton = document.querySelector('.header_switch');
const body = document.querySelector('body');

toggleButton.addEventListener('click', () => {
    if (body.classList.contains('light')) {
        body.classList.remove('light');
    }
    else {
        body.classList.add('light');
    }
});