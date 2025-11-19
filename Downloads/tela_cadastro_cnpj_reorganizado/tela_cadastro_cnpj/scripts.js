document.addEventListener('DOMContentLoaded', () => {

    // MAPA DE FLUXO DE NAVEGAÇÃO (FINAL)

    const FLOW = [
        'cadastro-opcoes.html',
        'dados_acesso.html',   
        'informacoes_basicas.html',
        'descricao_startup.html',
        'pessoa_de_contato.html',
        'endereco.html',
        'upload_arquivos.html',
        'revisao.html',
        'confirmacao.html'
    ];

    const currentPageName = location.pathname.split('/').pop();

    /**
     @param {number} direction 
     */
    const navigateFlow = (direction) => {
        const currentIndex = FLOW.indexOf(currentPageName);
        let nextIndex = currentIndex + direction;
        if (currentPageName === 'dados_acesso.html' && direction === -1) {
             window.location.href = 'cadastro-opcoes.html';
             return;
        }
        if (currentIndex === 0 && direction === -1) return;
        if (nextIndex < 0) return; 
        if (nextIndex >= FLOW.length) return;
        const nextUrl = FLOW[nextIndex];
        window.location.href = nextUrl;
    };

    // APLICAÇÃO DOS LISTENERS DE NAVEGAÇÃO
    
   const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', (event) => {
            event.preventDefault(); 
            navigateFlow(-1); 
        });
    }
    const reviewEditButton = document.querySelector('.secondary-button'); 
    const reviewConfirmButton = document.querySelector('.primary-button'); 
    if (reviewEditButton) {
        reviewEditButton.addEventListener('click', (event) => { 
            event.preventDefault(); 
            navigateFlow(-1); 
        });
    }

    if (reviewConfirmButton) {
        reviewConfirmButton.addEventListener('click', (event) => {
            event.preventDefault(); 
            const termPrivacy = document.getElementById('term-privacidade');
            const termAuth = document.getElementById('term-autorizacao');

            if (!termPrivacy || !termAuth || (termPrivacy.checked && termAuth.checked)) {
                navigateFlow(1); 
            } else {
                alert('Você deve aceitar os termos de privacidade e autorização antes de confirmar o cadastro.');
            }
        });
    }

    const confirmationButton = document.querySelector('.continue-button.confirmation-button');
    if (confirmationButton) {
        confirmationButton.addEventListener('click', (event) => {
            window.location.href = 'cadastro-opcoes.html'; 
        });
    }


    // LÓGICA DE SUBMISSÃO DE FORMULÁRIO (AVANÇO)

    const forms = document.querySelectorAll('.access-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let isFormValid = true;
            if (isFormValid) {
                navigateFlow(1);
            }
        });
    });
    
    

    // LÓGICA DO MULTI-SELECT CUSTOMIZADO 

    const customSelects = document.querySelectorAll('.custom-select');

    customSelects.forEach(selectContainer => {
        const display = selectContainer.querySelector('.select-display');
        const optionsContainer = selectContainer.querySelector('.select-options');
        const checkboxes = optionsContainer.querySelectorAll('input[type="checkbox"]');
        const placeholder = display.getAttribute('data-placeholder') || 'Selecione';

        // 1. Alterna a visibilidade das opções
        if (display) { 
            display.addEventListener('click', () => {
                document.querySelectorAll('.custom-select.active').forEach(openSelect => {
                    if (openSelect !== selectContainer) {
                        openSelect.classList.remove('active');
                    }
                });
                selectContainer.classList.toggle('active');
            });
        }
        
        // 2. Fecha ao clicar fora
        document.addEventListener('click', (event) => {
            if (!selectContainer.contains(event.target)) {
                selectContainer.classList.remove('active');
            }
        });

        // 3. Atualiza o texto de exibição ao selecionar/desselecionar
        const updateDisplay = () => {
            const selectedLabels = Array.from(checkboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.parentElement.textContent.trim());

            if (selectedLabels.length === 0) {
                display.textContent = placeholder;
            } else if (selectedLabels.length === 1) {
                display.textContent = selectedLabels[0];
            } else {
                display.textContent = `${selectedLabels.length} selecionados`;
            }
        };

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateDisplay);
        });

        updateDisplay();
    });

    // LÓGICA DE VALIDAÇÃO DE DADOS DE ACESSO

    const emailInput = document.getElementById('email');
    const confirmEmailInput = document.getElementById('confirm-email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const form = document.querySelector('.access-form');

    const reqList = document.querySelectorAll('.password-requirements ul li');
    if (reqList.length > 0) {
        const passwordRequirements = [
            { element: reqList[0], regex: /.{8,}/ }, // Mínimo 8 caracteres
            { element: reqList[1], regex: /[A-Z]/ }, // Uma letra maiúscula
            { element: reqList[2], regex: /[0-9]/ }, // Um número
            { element: reqList[3], regex: /[^A-Za-z0-9]/ }, // Um caractere especial
        ];
    
        const validatePasswordRequirements = () => {
            let allValid = true;
            const passwordValue = passwordInput.value;

            passwordRequirements.forEach(req => {
                const isValid = req.regex.test(passwordValue);
                req.element.classList.toggle('invalid', !isValid);
                if (!isValid) {
                    allValid = false;
                }
            });
            return allValid;
        };

        passwordInput.addEventListener('input', () => {
            validatePasswordRequirements();
            validatePasswordConfirmation(); 
        });
    }
    
    const validateConfirmation = (field, confirmationField) => {
        const parentGroup = confirmationField.closest('.form-group');
        const isValid = confirmationField.value === field.value && confirmationField.value !== '';
        
        parentGroup.classList.toggle('error', !isValid);
        return isValid;
    };

    const validateEmailConfirmation = () => {
        validateConfirmation(emailInput, confirmEmailInput);
    };

    const validatePasswordConfirmation = () => {
        if (passwordInput && validatePasswordRequirements()) {
             validateConfirmation(passwordInput, confirmPasswordInput);
        } else if (passwordInput) {
            confirmPasswordInput.closest('.form-group').classList.add('error');
        }
    };
    if (confirmEmailInput) confirmEmailInput.addEventListener('input', validateEmailConfirmation);
    if (emailInput) emailInput.addEventListener('input', validateEmailConfirmation);
    if (confirmPasswordInput) confirmPasswordInput.addEventListener('input', validatePasswordConfirmation);
    if (form && form.classList.contains('access-form')) {
        form.addEventListener('submit', (event) => {
            const isEmailMatch = validateConfirmation(emailInput, confirmEmailInput);
            const isPasswordMatch = validateConfirmation(passwordInput, confirmPasswordInput);
            const isPasswordStrong = validatePasswordRequirements();

            if (!isEmailMatch || !isPasswordMatch || !isPasswordStrong) {
                event.preventDefault();
                alert('Por favor, corrija os erros de validação antes de continuar.');
            }
        });
    }

});


    // LÓGICA DE VISIBILIDADE DE SENHA (TOGGLE)

    const togglePasswordButtons = document.querySelectorAll('.toggle-password');

    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); 

            const targetId = button.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);

            if (targetInput.type === 'password') {
                targetInput.type = 'text';
                button.classList.add('show'); 
                button.setAttribute('aria-label', 'Ocultar Senha');
                targetInput.focus();
            } else {
                targetInput.type = 'password';
                button.classList.remove('show'); 
                button.setAttribute('aria-label', 'Mostrar Senha');
                targetInput.focus(); 
            }
        });
    });
    

    // FUNÇÕES DE MÁSCARA

    const maskCNPJ = (value) => {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/, "$1.$2");
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
        value = value.replace(/(\d{4})(\d)/, "$1-$2");
        return value;
    };
    
    const cnpjInput = document.getElementById('cnpj');
    if (cnpjInput) {
        cnpjInput.addEventListener('input', (event) => {
            event.target.value = maskCNPJ(event.target.value);
        });
        cnpjInput.setAttribute('maxlength', '18'); 
    }

    // Máscara para CEP: 00000-000 (NOVO)
    const maskCEP = (value) => {
        value = value.replace(/\D/g, ""); // Remove tudo que não é dígito
        if (value.length > 8) {
            value = value.substring(0, 8); // Limita a 8 dígitos
        }
        value = value.replace(/^(\d{5})(\d)/, "$1-$2"); // Aplica o hífen após o quinto dígito
        return value;
    };

    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', (event) => {
            event.target.value = maskCEP(event.target.value);
        });
        cepInput.setAttribute('maxlength', '9');
    }

    const maskNumero = (value) => {
        value = value.replace(/\D/g, ""); 
        if (value.length > 3) {
            value = value.substring(0, 3); 
        }
        return value;
    };

    const numeroInput = document.getElementById('numero');
    if (numeroInput) {
        numeroInput.addEventListener('input', (event) => {
            event.target.value = maskNumero(event.target.value);
        });
    }

    const maskPhone = (value) => {
        value = value.replace(/\D/g, ""); 
        if (value.length > 11) {
            value = value.substring(0, 11);
        }
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); 
        value = value.replace(/(\d{5})(\d)/, '$1-$2'); 
        return value;
    };

    const phoneInput = document.getElementById('telefone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (event) => {
            event.target.value = maskPhone(event.target.value);
        });
        phoneInput.setAttribute('maxlength', '15'); 
    }
    
    