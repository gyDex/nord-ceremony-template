const btn_close = document.getElementById('popup__success_btn-close');

const btn_open_data = document.getElementById('popup_success_btn_open');

const popup_success = document.getElementById('popup_success')
const popup_success_content = document.getElementById('popup_success_content')
const popup_success_backdrop = document.getElementById('popup_success_backdrop')
console.log(popup_success);

console.log(btn_open_data[0]);

btn_open_data.addEventListener('click', function () {
    popup_success.classList.add('popup__success-active')
    popup_success_content.classList.add('popup__success__content-active')
})
btn_close.addEventListener('click', function () {
    popup_success.classList.remove('popup__success-active')
    popup_success_content.classList.remove('popup__success__content-active')

})