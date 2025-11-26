// ======== CAPTURANDO ELEMENTOS ========
const statusSelect = document.querySelector("select");
const dataInicio = document.querySelectorAll("input[type='date']")[0];
const dataFim = document.querySelectorAll("input[type='date']")[1];
const tabela = document.querySelector("tbody");
const btnFiltrar = document.querySelector(".btn-filter");
const btnsLaterais = document.querySelectorAll(".right-btn");
const btnDetalhes = document.querySelectorAll(".btn-view");

// ======== EVENTO: FILTRAR =========
btnFiltrar.addEventListener("click", () => {
    const statusFiltro = statusSelect.value.toLowerCase();
    const inicio = dataInicio.value ? new Date(dataInicio.value) : null;
    const fim = dataFim.value ? new Date(dataFim.value) : null;

    [...tabela.rows].forEach(row => {
        const status = row.cells[3].innerText.toLowerCase();
        const dataTexto = row.cells[2].innerText.split("/");
        const dataRow = new Date(`${dataTexto[2]}-${dataTexto[1]}-${dataTexto[0]}`);

        let mostrar = true;

        // Filtrar por status
        if (statusFiltro !== "todos" && !status.includes(statusFiltro)) {
            mostrar = false;
        }

        // Filtrar por datas
        if (inicio && dataRow < inicio) {
            mostrar = false;
        }

        if (fim && dataRow > fim) {
            mostrar = false;
        }

        row.style.display = mostrar ? "" : "none";
    });
});

// ======== EVENTO: BOTÕES LATERAIS =========
btnsLaterais[0].addEventListener("click", () => {
    alert("Acessibilidade / Contraste — funcionalidade futura!");
});

btnsLaterais[1].addEventListener("click", () => {
    alert("Leitor de tela — funcionalidade futura!");
});

btnsLaterais[2].addEventListener("click", () => {
    alert("Recurso de áudio — funcionalidade futura!");
});

// ======== EVENTO: BOTÕES VER DETALHES =========
btnDetalhes.forEach(btn => {
    btn.addEventListener("click", () => {
        alert("Aqui abrirá o modal com os detalhes da solicitação.");
    });
});

// ======== DEBUG =========
console.log("Script carregado com sucesso!");