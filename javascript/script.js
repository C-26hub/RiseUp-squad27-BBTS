// Navegação entre telas
function goTo(page) {
    window.location.href = page;
}

// Armazenar dados no sessionStorage
function saveForm(formId, nextPage) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach(input => {
        sessionStorage.setItem(input.name, input.value);
    });

    goTo(nextPage);
}

// Carregar dados na tela de revisão
function loadReview() {
    const fields = document.querySelectorAll("[data-field]");
    fields.forEach(el => {
        const value = sessionStorage.getItem(el.dataset.field);
        el.textContent = value || "—";
    });
}
