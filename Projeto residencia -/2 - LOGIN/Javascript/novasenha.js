function abrirPopup() {
    document.getElementById("popupSucesso").style.display = "flex";
}

function fecharPopup() {
    document.getElementById("popupSucesso").style.display = "none";
}

function voltarLogin() {
    window.location.href = "/2 - LOGIN/Telas_login/cadastrar.html"; // coloque o caminho correto aqui
}

// Chamado quando clica em "Salvar nova senha"
function voltarinicio() {
    // Aqui você pode colocar validação da senha se quiser

    abrirPopup();
}
