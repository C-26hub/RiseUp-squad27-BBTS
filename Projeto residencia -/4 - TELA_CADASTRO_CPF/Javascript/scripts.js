document.addEventListener("DOMContentLoaded", () => {

    // ============================================================
    // 1. DEFINIÇÃO DO FLUXO (6 telas)
    // ============================================================
    const FLOW = [
        "dados_acesso.html",      // 0
        "dados_pessoais.html",    // 1
        "endereco.html",          // 2
        "perfil.html",            // 3
        "revisao.html",           // 4
        "confirmacao.html"        // 5
    ];

    const currentPage = window.location.pathname.split("/").pop();
    const currentIndex = FLOW.indexOf(currentPage);

    // Função principal de navegação
    const navigateFlow = (direction) => {
        if (currentIndex === -1) return;

        const next = currentIndex + direction;
        if (next < 0 || next >= FLOW.length) return;

        window.location.href = FLOW[next];
    };

    // ============================================================
    // 2. BOTÃO VOLTAR (global)
    // ============================================================
    const backButton = document.querySelector(".back-button");
    if (backButton) {
        backButton.addEventListener("click", (e) => {
            e.preventDefault();
            navigateFlow(-1);
        });
    }

    // ============================================================
    // 3. BOTÃO CONTINUAR (global)
    // ============================================================
    const continueButton = document.querySelector(".continue-button");
    if (continueButton) {
        continueButton.addEventListener("click", (e) => {
            e.preventDefault();
            navigateFlow(1);
        });
    }

    // ============================================================
    // --- PÁGINA REVISÃO ---
    // ============================================================
    const reviewBackButton = document.querySelector('.review-buttons .secondary-button');
    const reviewConfirmButton = document.querySelector('.review-buttons .primary-button');

    if (currentPage === "revisao.html") {

        // Voltar e editar → volta uma página
        if (reviewBackButton) {
            reviewBackButton.addEventListener("click", (e) => {
                e.preventDefault();
                navigateFlow(-1);
            });
        }

        // Confirmar cadastro → última página
        if (reviewConfirmButton) {
            reviewConfirmButton.addEventListener("click", (e) => {
                e.preventDefault();
                window.location.href = "confirmacao.html";
            });
        }
    }

    // ============================================================
    // 4. Mostra / Oculta Senhas (global)
    // ============================================================
    document.querySelectorAll(".toggle-password").forEach(btn => {
        btn.addEventListener("click", () => {
            const target = document.getElementById(btn.dataset.target);
            if (!target) return;

            target.type = target.type === "password" ? "text" : "password";
            btn.classList.toggle("active");
        });
    });

    // ============================================================
    // 5. MULTI-SELECT CUSTOMIZADO
    // ============================================================
    document.querySelectorAll('.custom-select').forEach(select => {

        const display = select.querySelector('.select-display');
        const list = select.querySelector('.select-options');
        const checks = list.querySelectorAll('input[type="checkbox"]');
        const placeholder = display.dataset.placeholder || "Selecione";

        display.addEventListener("click", () => {
            document.querySelectorAll('.custom-select.active').forEach(open => {
                if (open !== select) open.classList.remove("active");
            });
            select.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (!select.contains(e.target)) select.classList.remove("active");
        });

        const refresh = () => {
            const selected = [...checks].filter(c => c.checked).map(c => c.parentElement.textContent.trim());

            if (selected.length === 0) display.textContent = placeholder;
            else if (selected.length === 1) display.textContent = selected[0];
            else display.textContent = `${selected.length} selecionados`;
        };

        checks.forEach(c => c.addEventListener("change", refresh));
        refresh();
    });

    // ============================================================
    // 6. VALIDAÇÕES – DADOS DE ACESSO
    // ============================================================
    const email = document.getElementById("email");
    const emailConfirm = document.getElementById("confirm-email");
    const pass = document.getElementById("password");
    const passConfirm = document.getElementById("confirm-password");
    const accessForm = document.querySelector(".access-form");

    const reqList = document.querySelectorAll(".password-requirements ul li");

    const passwordRules = [
        { el: reqList[0], regex: /.{8,}/ },
        { el: reqList[1], regex: /[A-Z]/ },
        { el: reqList[2], regex: /[0-9]/ },
        { el: reqList[3], regex: /[^A-Za-z0-9]/ }
    ];

    const validatePasswordStrength = () => {
        let ok = true;
        const v = pass.value;

        passwordRules.forEach(rule => {
            const good = rule.regex.test(v);
            rule.el.classList.toggle("invalid", !good);
            if (!good) ok = false;
        });
        return ok;
    };

    const validateConfirm = (base, confirm) => {
        const group = confirm.closest(".form-group");
        const ok = base.value === confirm.value && confirm.value.trim() !== "";
        group.classList.toggle("error", !ok);
        return ok;
    };

    if (accessForm) {
        pass.addEventListener("input", () => {
            validatePasswordStrength();
            validateConfirm(pass, passConfirm);
        });

        emailConfirm.addEventListener("input", () => validateConfirm(email, emailConfirm));

        passConfirm.addEventListener("input", () => validateConfirm(pass, passConfirm));

        accessForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const emailOK = validateConfirm(email, emailConfirm);
            const passStrong = validatePasswordStrength();
            const passOK = validateConfirm(pass, passConfirm);

            if (emailOK && passStrong && passOK) navigateFlow(1);
            else alert("Corrija os erros antes de continuar.");
        });
    }

    // ============================================================
    // 7. VALIDAÇÕES – INFORMAÇÕES BÁSICAS
    // ============================================================
    const basicForm = document.querySelector(".access-form1");
    const razao = document.getElementById("razao-social");
    const fantasia = document.getElementById("nome-fantasia");
    const cnpj = document.getElementById("cnpj");

    const validateRequired = (input) => {
        const g = input.closest(".form-group");
        const ok = input.value.trim() !== "";
        g.classList.toggle("error", !ok);
        return ok;
    };

    const validateCNPJ = () => {
        if (!cnpj) return true;
        const g = cnpj.closest(".form-group");
        const clean = cnpj.value.replace(/\D/g, "");
        const ok = clean.length === 14;
        g.classList.toggle("error", !ok);
        return ok;
    };

    if (basicForm) {
        razao.addEventListener("input", () => validateRequired(razao));
        fantasia.addEventListener("input", () => validateRequired(fantasia));
        cnpj.addEventListener("input", validateCNPJ);

        basicForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const ok1 = validateRequired(razao);
            const ok2 = validateRequired(fantasia);
            const ok3 = validateCNPJ();

            if (ok1 && ok2 && ok3) navigateFlow(1);
            else alert("Preencha todos os campos corretamente.");
        });
    }

    // ============================================================
    // 8. MÁSCARAS (CNPJ, CEP, TELEFONE, NÚMERO)
    // ============================================================
    const maskCNPJ = (v) => {
        return v.replace(/\D/g, "")
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    };

    if (cnpj) {
        cnpj.setAttribute("maxlength", "18");
        cnpj.addEventListener("input", (e) => {
            e.target.value = maskCNPJ(e.target.value);
        });
    }

    // CEP
    const cep = document.getElementById("cep");
    if (cep) {
        cep.setAttribute("maxlength", "9");

        const maskCEP = (v) => {
            v = v.replace(/\D/g, "");
            if (v.length > 8) v = v.slice(0, 8);
            return v.replace(/^(\d{5})(\d)/, "$1-$2");
        };

        cep.addEventListener("input", (e) => {
            e.target.value = maskCEP(e.target.value);
        });

        const autoFillCEP = async () => {
            const clean = cep.value.replace(/\D/g, "");
            if (clean.length !== 8) return;

            try {
                const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
                const data = await res.json();

                if (data.erro) {
                    alert("CEP não encontrado.");
                    return;
                }

                document.getElementById("rua").value = data.logradouro || "";

                const estado = document.getElementById("estado");
                [...estado.options].forEach(opt => {
                    if (opt.value === data.uf) estado.value = data.uf;
                });

                const pais = document.getElementById("pais");
                if (pais) pais.value = "br";

                const numero = document.getElementById("numero");
                if (numero) numero.focus();

            } catch (err) {
                alert("Erro ao consultar o CEP.");
            }
        };

        cep.addEventListener("blur", autoFillCEP);
        cep.addEventListener("input", (e) => {
            if (e.target.value.length === 9) autoFillCEP();
        });
    }

    // Número
    const numero = document.getElementById("numero");
    if (numero) {
        numero.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/\D/g, "").slice(0, 3);
        });
    }

    // Telefone
    const telefone = document.getElementById("telefone");
    if (telefone) {
        telefone.setAttribute("maxlength", "15");

        telefone.addEventListener("input", (e) => {
            let v = e.target.value.replace(/\D/g, "").slice(0, 11);
            v = v.replace(/^(\d{2})(\d)/, "($1) $2");
            v = v.replace(/(\d{5})(\d)/, "$1-$2");
            e.target.value = v;
        });
    }

});

// Botao confirmacao
document.querySelector(".continue-button.confirmation-button").addEventListener("click", function () {
    window.location.href = "../../6 - TELA_USUARIO/telas/index.html";
    });

