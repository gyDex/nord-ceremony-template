document.addEventListener("DOMContentLoaded", () => {
    const closeButton = document.getElementById("popup_join_btn-close");
    const openButtons = document.querySelectorAll(".popup_join_btn_open");
    const popupJoin = document.getElementById("popup_join");
    const popupJoinContent = document.getElementById("popup_join_content");

    function openPopup() {
        popupJoin.classList.add("popup__join-active");
        popupJoinContent.classList.add("popup__join__content-active");
    }

    function closePopup() {
        popupJoin.classList.remove("popup__join-active");
        popupJoinContent.classList.remove("popup__join__content-active");
    }

    openButtons.forEach(button => button.addEventListener("click", openPopup));
    closeButton?.addEventListener("click", closePopup);
});
