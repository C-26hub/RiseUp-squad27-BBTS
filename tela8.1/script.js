function filtrar() {
    const statusFiltro = document.getElementById("statusFilter").value;

    const linhas = document.querySelectorAll("#tabelaCorpo tr");

    linhas.forEach(linha => {
        const badge = linha.querySelector(".badge").textContent.toLowerCase();

        if (statusFiltro === "todos" || badge.includes(statusFiltro)) {
            linha.style.display = "";
        } else {
            linha.style.display = "none";
        }
    });
}
