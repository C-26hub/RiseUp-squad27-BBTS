document.addEventListener('DOMContentLoaded', () => {
    // ===================================
    // 1. REFERÊNCIAS E FUNÇÕES DO MODAL
    // ===================================
    const successModal = document.getElementById('passwordSuccessModal');
    // const closeSuccessBtn = document.getElementById('closePasswordSuccessBtn'); // Não é mais usado, o 'X' foi removido
    const goToHomeBtn = document.getElementById('goToHomeBtn');
    
    // Funções de controle do Modal
    function showSuccessModal() {
        if (successModal) {
            // AQUI FORÇAMOS A EXIBIÇÃO: Usando setProperty para anular qualquer display: none!important
            successModal.style.setProperty('display', 'flex', 'important'); 
        } else {
            console.error("ERRO CRÍTICO: Modal 'passwordSuccessModal' não encontrado no DOM. Verifique o ID no HTML.");
            alert("Erro: O pop-up de sucesso não foi encontrado."); 
        }
        document.body.style.overflow = 'hidden'; // Evita scroll
    }

    function hideSuccessModal() {
        if (successModal) {
            successModal.style.setProperty('display', 'none', 'important');
        }
        document.body.style.overflow = ''; // Restaura scroll
    }

    // Ações do Modal
    // O botão 'X' foi removido do HTML, então este evento foi removido.
    
    if (goToHomeBtn) {
        goToHomeBtn.addEventListener('click', () => {
            // Ação principal: Redireciona para a página inicial (index.html)
            window.location.href = 'index.html'; 
        });
    }

    // ===================================
    // 2. LÓGICA DO FORMULÁRIO DE SENHA
    // ===================================
    const form = document.querySelector('.form-alterar-senha');
    const senhaAtualInput = document.getElementById('senha-atual');
    const novaSenhaInput = document.getElementById('nova-senha');
    const confirmarNovaSenhaInput = document.getElementById('confirmar-nova-senha');

    // Expressão Regular (Regex) para os requisitos de segurança
    const regexSenhaForte = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const senhaAtual = senhaAtualInput.value;
            const novaSenha = novaSenhaInput.value;
            const confirmarNovaSenha = confirmarNovaSenhaInput.value;
            
            let isValid = true;

            // 1. FORÇA DA SENHA
            if (!regexSenhaForte.test(novaSenha)) {
                isValid = false;
                alert('A nova senha deve ter no mínimo 8 dígitos, e conter pelo menos uma letra, um número e um caractere especial (!@#$%^&*).');
                novaSenhaInput.focus();
                return;
            }

            // 2. NOVA SENHA NÃO PODE SER IGUAL À ATUAL
            if (novaSenha === senhaAtual) {
                isValid = false;
                alert('A Nova Senha não pode ser igual à Senha Atual.');
                novaSenhaInput.focus();
                return;
            }

            // 3. CONFIRMAÇÃO DE SENHA
            if (novaSenha !== confirmarNovaSenha) {
                isValid = false;
                alert('A Nova Senha e a Confirmação da Nova Senha não são iguais.');
                confirmarNovaSenhaInput.focus();
                return;
            }
            
            // SE TUDO OK:
            if (isValid) {
                console.log("Validações OK. Exibindo modal de sucesso.");
                
                // EXIBE O MODAL
                showSuccessModal(); 
                
                form.reset(); 
            }
        });
    }
});