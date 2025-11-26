const submenuToggle = document.querySelector(".submenu-toggle");
const submenu = document.querySelector("#dados-cadastro-submenu"); // Use o ID
const submenuLinks = document.querySelectorAll("#dados-cadastro-submenu .submenu-item");

// ===========================================
// Lógica para TELA 06 (Histórico de Solicitações)
// ===========================================

// 1. Início: Todos os submenus devem estar fechados, a menos que haja um item ativo.
// Na TELA 06, o item ativo é "Histórico de Solicitações" (fora do submenu),
// então o submenu "Dados de Cadastro" deve começar FECHADO.
if (submenu && submenuToggle) {
    submenu.classList.remove("submenu-open");
    submenu.classList.add("submenu-closed");
    submenuToggle.classList.remove("arrow-open");
}

// Se a página atual tem ".destaque" (se estivéssemos em TELA03, TELA04 ou TELA05), 
// o submenu abriria. Como estamos em TELA06, ignoramos essa abertura automática.
const hasDestaque = document.querySelector(".submenu-item.destaque");
if (hasDestaque) {
    submenu.classList.remove("submenu-closed");
    submenu.classList.add("submenu-open");
    submenuToggle.classList.add("arrow-open");
}


// 2. Evento de Clique para Abrir/Fechar
if (submenuToggle && submenu) {
    submenuToggle.addEventListener("click", (e) => {
        e.preventDefault(); // Impede o link '#' de recarregar a página
        
        // Alterna entre abrir e fechar o submenu (e a seta)
        submenu.classList.toggle("submenu-open");
        submenuToggle.classList.toggle("arrow-open");
    });
}