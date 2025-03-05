const header_menu_open_btn = document.getElementById('header_menu_open_btn');

const header_menu = document.getElementById('header__menu')
const header_menu_content = document.getElementById('header__menu_content')
const header_menu_backdrop = document.getElementById('header__menu_backdrop')

header_menu_open_btn.addEventListener('click', function () {
    header_menu.classList.add('header__menu-active')
    header_menu_content.classList.add('header__menu_content-active')
})

header_menu_backdrop.addEventListener('click', function () {
    header_menu.classList.remove('header__menu-active')
    header_menu_content.classList.remove('header__menu_content-active')

})