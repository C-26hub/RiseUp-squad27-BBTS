document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
          MAPA DAS PÁGINAS
    =============================== */
    const pageMap = {
        'inicio': 'inicio-page',
        'startups': 'startups-page',
        'usuarios': 'usuarios-page',
        'aprovacoes-cadastro': 'aprovacoes-page',
        'solicitacoes-edicao': 'solicitacoes-page',
        'personalizacao': 'personalizacao-page',
        'alterar-senha': 'alterar-senha-page',
        'sair': 'sair-page'
    };

    function showPage(pageKey) {
        const pageId = pageMap[pageKey];
        if (!pageId) return;

        document.querySelectorAll(".page").forEach(p => p.style.display = "none");
        document.getElementById(pageId).style.display = "block";
    }

    showPage("inicio");

    /* MENU */
    document.querySelectorAll(".submenu-item").forEach(item => {
        item.addEventListener("click", () => {
            const page = item.dataset.page;
            showPage(page);

            document.querySelectorAll(".submenu-item").forEach(i => i.classList.remove("active"));
            item.classList.add("active");
        });
    });

    document.querySelectorAll(".menu-item-header").forEach(header => {
        header.addEventListener("click", () => {
            const submenu = header.parentElement.querySelector(".submenu");
            if (!submenu) return;

            const isOpen = submenu.style.display === "block";
            document.querySelectorAll(".submenu").forEach(s => s.style.display = "none");
            submenu.style.display = isOpen ? "none" : "block";
        });
    });

    /* =========================================================
         MODAL DETALHES
    ========================================================= */
    const modal = document.getElementById("modal");
    const closeBtn = document.querySelector(".close-modal");
    const btnsDetails = document.querySelectorAll(".btn-details");

    if (modal) {
        btnsDetails.forEach(btn =>
            btn.addEventListener("click", () => modal.classList.add("active"))
        );

        if (closeBtn) {
            closeBtn.addEventListener("click", () => modal.classList.remove("active"));
        }

        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("active");
        });
    }

    /* =========================================================
         ALTERAR STATUS
    ========================================================= */
    document.querySelectorAll(".btn-danger, .btn-success").forEach(btn => {
        btn.addEventListener("click", () => {

            const row = btn.closest("tr");
            const statusTag = row.querySelector(".tag");
            const isAtiva = statusTag.innerText.trim() === "Ativa";

            if (isAtiva) {
                statusTag.innerText = "Inativa";
                statusTag.classList.remove("green");
                statusTag.classList.add("red");

                btn.innerText = "Ativar";
                btn.classList.remove("btn-danger");
                btn.classList.add("btn-success");

            } else {
                statusTag.innerText = "Ativa";
                statusTag.classList.remove("red");
                statusTag.classList.add("green");

                btn.innerText = "Desativar";
                btn.classList.remove("btn-success");
                btn.classList.add("btn-danger");
            }
        });
    });

    /* =========================================================
         FILTRO TABELA
    ========================================================= */
    const statusSelect = document.querySelector(".filter-select-box select");
    const dateInputs = document.querySelectorAll(".date-input");
    const filterBtn = document.querySelector(".btn-filter");
    const tableRows = document.querySelectorAll(".styled-table tbody tr");

    function filterTable() {
        console.log("Função filterTable foi chamada!");

        const selectedStatus = statusSelect.value.trim();
        const dateStart = dateInputs[0].value ? new Date(dateInputs[0].value) : null;
        const dateEnd = dateInputs[1].value ? new Date(dateInputs[1].value) : null;

        tableRows.forEach(row => {

            let show = true;
            const tagEl = row.querySelector(".tag");
            if (!tagEl) return;

            const statusText = tagEl.innerText.trim();

            if (selectedStatus !== "Todos" && selectedStatus !== statusText) {
                show = false;
            }

            const [dia, mes, ano] = row.children[2].innerText.trim().split("/");
            const rowDate = new Date(`${ano}-${mes}-${dia}`);

            if (dateStart && rowDate < dateStart) show = false;
            if (dateEnd && rowDate > dateEnd) show = false;

            row.style.display = show ? "" : "none";
        });
    }

    filterBtn.addEventListener("click", filterTable);
});

// ================================
// TELA 4: APROVAÇÕES DE CADASTRO
// ================================

// ==========================
// BOTÕES APROVAR / REJEITAR
// ==========================

const approveButtons = document.querySelectorAll(".btn-approve");
const rejectButtons = document.querySelectorAll(".btn-reject");

approveButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const row = btn.closest("tr");
    row.classList.add("approved");
    row.classList.remove("rejected");
    alert("✔ Solicitação aprovada!");
  });
});

rejectButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const row = btn.closest("tr");
    row.classList.add("rejected");
    row.classList.remove("approved");
    alert("✖ Solicitação rejeitada!");
  });
});

// ================================
// TELA 5: SOLICITAÇÕES DE EDIÇÃO
// ================================

// ================================
// TELA 6: PERSONALIZAÇÃO
// ================================

// Logo Upload
const logoSection = document.getElementById('logoSection');
const logoInput = document.getElementById('logoInput');

logoSection.addEventListener('click', () => {
    logoInput.click();
});

logoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            logoSection.innerHTML = `<img src="${event.target.result}" style="max-width: 100%; max-height: 100px; object-fit: contain;">`;
        };
        reader.readAsDataURL(file);
    }
});

// Color Pickers
for (let i = 1; i <= 3; i++) {
    const preview = document.getElementById(`colorPreview${i}`);
    const input = document.getElementById(`colorInput${i}`);
    const picker = document.getElementById(`colorPicker${i}`);

    preview.addEventListener('click', () => {
        picker.click();
    });

    picker.addEventListener('input', (e) => {
        const color = e.target.value;
        preview.style.backgroundColor = color;
        input.value = color.toUpperCase();
    });

    input.addEventListener('input', (e) => {
        const color = e.target.value;
        if (/^#[0-9A-F]{6}$/i.test(color)) {
            preview.style.backgroundColor = color;
            picker.value = color;
        }
    });
}

// Font Selection
const fontSelect = document.getElementById('fontSelect');
fontSelect.addEventListener('change', (e) => {
    document.body.style.fontFamily = e.target.value + ", sans-serif";
});

// Action Buttons
document.querySelector('.btn-check').addEventListener('click', () => {
    const config = {
        logo: logoSection.innerHTML,
        corPrincipal: document.getElementById('colorInput1').value,
        corSecundaria: document.getElementById('colorInput2').value,
        corFundo: document.getElementById('colorInput3').value,
        tipografia: fontSelect.value
    };
    
    console.log('Configurações salvas:', config);
    alert('Configurações salvas com sucesso!');
});

document.querySelector('.btn-add').addEventListener('click', () => {
    alert('Funcionalidade de adicionar');
});

document.querySelector('.btn-edit').addEventListener('click', () => {
    alert('Funcionalidade de editar');
});

// Menu interactions
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        console.log('Menu clicado:', item.textContent);
    });
});

const submenuItems = document.querySelectorAll('.submenu-item');
submenuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        submenuItems.forEach(sub => sub.classList.remove('active'));
        item.classList.add('active');
        console.log('Submenu clicado:', item.textContent);
    });
});

// ================================
// TELA 6: ALTERAR SENHA
// ================================

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


