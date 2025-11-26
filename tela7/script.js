// Toggle sidebar
document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("collapsed");
});


// FILTER SYSTEM
const statusFilter = document.getElementById("statusFilter");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const tableBody = document.getElementById("tableBody");

document.getElementById("applyFilters").addEventListener("click", () => {
    const status = statusFilter.value;

    const start = startDate.value ? new Date(startDate.value) : null;
    const end = endDate.value ? new Date(endDate.value) : null;

    [...tableBody.children].forEach(row => {
        const rowStatus = row.dataset.status;
        const rowDate = new Date(row.children[2].innerText.split("/").reverse().join("-"));

        let show = true;

        if (status !== "todos" && rowStatus !== status) show = false;
        if (start && rowDate < start) show = false;
        if (end && rowDate > end) show = false;

        row.style.display = show ? "" : "none";
    });
});


// View button example (modal behavior)
document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        alert("Aqui abrirá o modal com os detalhes!");
    });
});
