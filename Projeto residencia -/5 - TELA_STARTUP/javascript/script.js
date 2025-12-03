// Mapa de páginas e seus IDs
const pageMap = {
    'inicio': 'inicio-page',
    'dados-cadastro': 'dados-cadastro-page',
    'info-basicas': 'info-basicas-page',
    'descricao-startup': 'descricao-startup-page',
    'pessoa-contato': 'pessoa-contato-page',
    'endereco': 'endereco-page',
    'documentos': 'documentos-page',
    'historico': 'historico-page',
    'alterar-senha': 'alterar-senha-page',
    'ajuda': 'ajuda-page'
};

// Estado da navegação
let currentPage = 'inicio';
let currentSubmenu = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function () {
    initializeMenuListeners();
    initializeFormListeners();
    showPage('inicio');
});

/* =======================================================================
   DROPDOWN DO HEADER 
   ======================================================================= */
const userMenu = document.getElementById("headerUserMenu");
const dropdown = document.getElementById("headerDropdown");

// Mostrar / esconder dropdown
userMenu.addEventListener("click", () => {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

// Fechar ao clicar fora (SEM ATRAPALHAR O SIDEBAR)
document.addEventListener("click", (event) => {
    const clickedInsideSidebar = event.target.closest(".sidebar");

    if (!dropdown.contains(event.target) &&
        !userMenu.contains(event.target) &&
        !clickedInsideSidebar) {
        dropdown.style.display = "none";
    }
});

// Navegar para páginas do dropdown
document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", () => {
        const page = item.getAttribute("data-page");

        if (page === "logout") {
            handleLogout();
            return;
        }

        showPage(page);
        dropdown.style.display = "none";
    });
});

/* =======================================================================
   LISTENERS DO SIDEBAR (CORRIGIDO COM stopPropagation)
   ======================================================================= */
function initializeMenuListeners() {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.stopPropagation(); // impede conflito com clique global

            const dataPage = this.getAttribute('data-page');
            const submenu = this.querySelector('.submenu');

            // Submenu: abrir/fechar
            if (submenu) {
                e.preventDefault();
                const isExpanded = this.classList.contains('expanded');

                // Fecha outros submenus
                document.querySelectorAll('.menu-item.expanded').forEach(expanded => {
                    if (expanded !== this) {
                        expanded.classList.remove('expanded');
                        expanded.querySelector('.submenu').style.display = 'none';
                    }
                });

                // Alternar
                if (isExpanded) {
                    this.classList.remove('expanded');
                    submenu.style.display = 'none';
                } else {
                    this.classList.add('expanded');
                    submenu.style.display = 'flex';
                }
            } else {
                // Ir para página
                showPage(dataPage);

                document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Submenu items
    const submenuItems = document.querySelectorAll('.submenu-item');
    submenuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.stopPropagation(); // evita conflito com dropdown

            const dataPage = this.getAttribute('data-page');
            showPage(dataPage);

            document.querySelectorAll('.submenu-item').forEach(m => m.classList.remove('active'));
            this.classList.add('active');

            document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
        });
    });
}

/* =======================================================================
   FUNÇÃO PARA TROCAR PÁGINAS
   ======================================================================= */
function showPage(pageKey) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });

    if (pageMap[pageKey]) {
        const page = document.getElementById(pageMap[pageKey]);
        if (page) {
            page.style.display = 'block';
            currentPage = pageKey;
        }
    }
}

/* =======================================================================
   MODAIS
   ======================================================================= */
function openRequestModal() {
    const modal = document.getElementById('request-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeRequestModal() {
    const modal = document.getElementById('request-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('request-form').reset();
}

function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function submitRequest() {
    const alteracao = document.getElementById('alteracao');
    const justificativa = document.getElementById('justificativa');

    if (!alteracao.value || !justificativa.value) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    closeRequestModal();

    const successModal = document.getElementById('success-modal');
    successModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    console.log('Solicitação enviada:', {
        campo: alteracao.value,
        justificativa: justificativa.value,
        data: new Date().toLocaleString('pt-BR')
    });
}
// --- listeners robustos para fechar modal enviado ---
function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// garante fechamento quando clicar no botão X do modal enviado
document.querySelectorAll('.modal-close-enviado').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        closeSuccessModal();
    });
});

// Fechar modais clicando fora
document.addEventListener('click', function (e) {
    const requestModal = document.getElementById('request-modal');
    const successModal = document.getElementById('success-modal');

    if (e.target === requestModal) closeRequestModal();
    if (e.target === successModal) closeSuccessModal();
});

// Fechar modais com ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        if (document.getElementById('request-modal').style.display === 'flex') closeRequestModal();
        if (document.getElementById('success-modal').style.display === 'flex') closeSuccessModal();
    }
});

/* =======================================================================
   FORMULÁRIOS
   ======================================================================= */
function initializeFormListeners() {
    const alterarSenhaForm = document.querySelector('#alterar-senha-page form');

    if (alterarSenhaForm) {
        alterarSenhaForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (!currentPassword || !newPassword || !confirmPassword) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            if (newPassword !== confirmPassword) {
                alert('As senhas não correspondem.');
                return;
            }

            if (newPassword.length < 6) {
                alert('A nova senha deve ter pelo menos 6 caracteres.');
                return;
            }

            alert('Senha alterada com sucesso!');
            this.reset();
        });
    }
}

/* =======================================================================
   LOGOUT
   ======================================================================= */
function handleLogout() {
    alert('Você foi desconectado.');
    window.location.href = '/';
}

/* =======================================================================
   BOTÃO "VER MAIS"
   ======================================================================= */
document.addEventListener('DOMContentLoaded', function () {
    const verMaisBtn = document.querySelector('.btn-secondary');
    if (verMaisBtn && verMaisBtn.textContent === 'Ver mais') {
        verMaisBtn.addEventListener('click', function () {
            alert('Carregando mais solicitações...');
        });
    }
});

 document.querySelector(".btn-vlibras").addEventListener("click", () => {
  const botao = document.querySelector("[vw-access-button]");
  botao.click();
});
