document.addEventListener('DOMContentLoaded', function() {
    // ===============================================
    // 1. LÓGICA DO SUBMENU (USANDO CLASSES CSS)
    // ===============================================
    const submenuToggle = document.querySelector(".submenu-toggle");
    const submenu = document.querySelector(".submenu");
    const arrow = document.querySelector(".arrow-icon");
    const submenuLinks = document.querySelectorAll(".submenu-item");

    // NOTA: O CSS CORRIGIDO agora usa .submenu.open { max-height: 500px; }

    // 1a. Estado Inicial: Garante que o submenu comece fechado por padrão
    if (submenu) submenu.classList.remove("open");

    // 1b. Abre automaticamente se a página atual for um item em destaque (TELA04)
    const hasActive = document.querySelector(".submenu-item.destaque");
    if (hasActive) {
        if (submenu) submenu.classList.add("open"); // Adiciona a classe para exibir
        if (arrow) arrow.classList.add("arrow-open");
    }

    // 1c. Alterna o submenu ao clicar no toggle
    if (submenuToggle && submenu && arrow) {
        submenuToggle.addEventListener("click", () => {
            // O .toggle() alterna o estado da classe, permitindo ABRIR e FECHAR.
            submenu.classList.toggle("open");
            arrow.classList.toggle("arrow-open");
        });
    }

    // 1d. (Opcional) FECHA o submenu após clicar em um link interno
    submenuLinks.forEach(link => {
        link.addEventListener("click", () => {
            // Adiciona um pequeno delay para a navegação/animação antes de fechar.
            setTimeout(() => {
                if (submenu) submenu.classList.remove("open");
                if (arrow) arrow.classList.remove("arrow-open");
            }, 100); 
        });
    });


    // ===============================================
    // 2. LÓGICA DOS MODAIS (EDIÇÃO E SUCESSO)
    // ===============================================

    // Referências aos modais
    const solicitarEdicaoBtn = document.querySelector('.solicitar-edicao');
    const editModalOverlay = document.getElementById('editModalOverlay');
    const successModalOverlay = document.getElementById('successModalOverlay');
    const modalForm = document.querySelector('.modal-form');

    // Referências dos botões de fechar
    const closeModalBtn = document.getElementById('closeModalButton');
    const cancelModalBtn = document.getElementById('cancelModalButton');
    const closeSuccessModalBtn = document.getElementById('closeSuccessModalButton');


    // Funções de controle
    function toggleModal(modal, show) {
        if (modal) {
            modal.style.display = show ? 'flex' : 'none';
        }
        // Controla o scroll do corpo
        document.body.style.overflow = show ? 'hidden' : '';
    }

    function closeEditModal() {
        toggleModal(editModalOverlay, false);
    }
    
    function closeSuccessModal() {
        toggleModal(successModalOverlay, false);
    }

    // Ações do Modal de Edição
    if (solicitarEdicaoBtn) {
        solicitarEdicaoBtn.addEventListener('click', () => {
            toggleModal(editModalOverlay, true);
        });
    }
    if (closeModalBtn) { closeModalBtn.addEventListener('click', closeEditModal); }
    if (cancelModalBtn) { cancelModalBtn.addEventListener('click', closeEditModal); }
    if (editModalOverlay) {
        editModalOverlay.addEventListener('click', function(event) {
            if (event.target === editModalOverlay) { closeEditModal(); }
        });
    }

    // Ações do Modal de Sucesso
    if (closeSuccessModalBtn) { closeSuccessModalBtn.addEventListener('click', closeSuccessModal); }
    if (successModalOverlay) {
        successModalOverlay.addEventListener('click', function(event) {
            if (event.target === successModalOverlay) { closeSuccessModal(); }
        });
    }


    // Lógica de ENVIO: Fecha o de edição e abre o de sucesso
    if (modalForm) {
        modalForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            closeEditModal();
            toggleModal(successModalOverlay, true); // Abre o modal de sucesso
            
            modalForm.reset(); 
        });
    }
});