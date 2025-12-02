document.getElementById("login-link")?.addEventListener("click", () => {
  window.location.href = "../../2 - LOGIN/Telas_login/cadastrar.html";
});


function voltarinicio() {
    // redireciona para outra página
    window.location.href = "../../2 - LOGIN/Telas_login/senhasalva.html"; 
}


const form = document.getElementById('bntRedirecionar');

btnRedirecionar.addEventListener('click', function() {
  // 1. Exibe o alerta para o usuário
  alert('E-mail enviado! Redirecionando para a página inicial...');
  // 3. Executa o redirecionamento para a nova página
  window.location.href = '../../1 - HOME/Telas_Home/index.html';
}); 

// Seleciona o formulário pelo ID que acabamos de adicionar
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(event) {
    // 1. Previne o comportamento padrão (o recarregamento da página)
    event.preventDefault();
    // Exemplo de Redirecionamento após o "login"
    window.location.href = '../../2 - LOGIN/Telas_login/autenticacao.html';
});


//
document.querySelector(".btn").addEventListener("click", function (event) {
    event.preventDefault(); // impede o envio do formulário
    window.location.href = "../../2 - LOGIN/Telas_login/autenticacao.html"; // <-- coloque o caminho da página desejada
});


//botao acessar - CNPJ
document.getElementById("cadCnpj").addEventListener("click", function() {
    window.location.href = "../../3 - TELA_CADASTRO_CNPJ/telas/dados_acesso.html"; // coloque o caminho da página
});
