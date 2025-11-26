const form = document.getElementById("senhaForm");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const current = document.getElementById("current");
    const newpass = document.getElementById("newpass");
    const confirm = document.getElementById("confirm");

    if (!current.value || !newpass.value || !confirm.value) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (newpass.value !== confirm.value) {
        alert("As senhas não conferem.");
        return;
    }

    if (newpass.value.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    alert("Senha alterada com sucesso!");
    form.reset();
});