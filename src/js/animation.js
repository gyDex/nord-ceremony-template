import ScrollReveal from 'scrollreveal';
const blocks = document.querySelectorAll('.block__initial_container, .block__about, .block__join, .terms__conditions, .choice__us_title, .block__contact');
const items = document.querySelectorAll('.block__initial_bottom-list_item, .block__about-list_item, .block__join_list_item, .process-line__steps_item, .choice__us_list_item, .terms__conditions_content-right_item, .block__contact_collumn_item-social_network a')
const animationPropertyBlocks = {
    duration: 500,     // Длительность анимации в мс
    origin: 'bottom',   // Направление появления (снизу)
    distance: '50px',
    delay: 200,
    easing: 'ease-in-out',
}

const animationPropertyItems = {
    interval: 200,
    delay: 200,
    distance: '50px',
    easing: 'ease-in-out',
    viewFactor: 0.5,
};



ScrollReveal().reveal(blocks, animationPropertyBlocks);

ScrollReveal().reveal(items, animationPropertyItems);

ScrollReveal().reveal('.process-line__steps-line-container', { delay: 3000 });