const btn_close = document.getElementById('popup_join_btn-close');

const btn_open_data = document.getElementsByClassName('popup_join_btn_open');

const popup_join = document.getElementById('popup_join')
const popup_join_content = document.getElementById('popup_join_content')
const popup_join_backdrop = document.getElementById('popup_join_backdrop')
console.log(popup_join);

console.log(btn_open_data[0]);

btn_open_data[0].addEventListener('click', function () {
    popup_join.classList.add('popup__join-active')
    popup_join_content.classList.add('popup__join__content-active')
})
btn_open_data[1].addEventListener('click', function () {
    popup_join.classList.add('popup__join-active')
    popup_join_content.classList.add('popup__join__content-active')
})
btn_close.addEventListener('click', function () {
    popup_join.classList.remove('popup__join-active')
    popup_join_content.classList.remove('popup__join__content-active')

})