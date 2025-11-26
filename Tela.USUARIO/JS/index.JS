document.addEventListener("DOMContentLoaded", function() {
    const submenuToggle = document.querySelector(".submenu-toggle");
    const submenu = document.querySelector(".submenu");
    const arrowIcon = submenuToggle.querySelector(".arrow-icon");

    submenuToggle.addEventListener("click", function() {
        // Alterna a visibilidade do submenu
        submenu.classList.toggle("show");

        // Altera a rotação da seta
        arrowIcon.classList.toggle("arrow-open");
    });
});

