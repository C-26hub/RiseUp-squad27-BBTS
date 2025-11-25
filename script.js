document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu-item");
  const submenuItems = document.querySelectorAll(".submenu-item");
  const content = document.getElementById("main-content");

  // --- 1️⃣ Controla o abrir/fechar do submenu ---
  document.querySelectorAll(".dropdown").forEach(drop => {
    drop.addEventListener("click", () => {
      drop.classList.toggle("open");
    });
  });

  // --- 2️⃣ Controla clique nos itens do menu principal ---
  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      menuItems.forEach(i => i.classList.remove("active"));
      submenuItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      const section = item.dataset.section;
      if (section) loadSection(section);
    });
  });

  // --- 3️⃣ Controla clique nos itens do submenu ---
  submenuItems.forEach(sub => {
    sub.addEventListener("click", e => {
      e.stopPropagation();
      submenuItems.forEach(i => i.classList.remove("active"));
      menuItems.forEach(i => i.classList.remove("active"));
      sub.classList.add("active");

      const section = sub.dataset.section;
      if (section) loadSection(section);
    });
  });

  // --- 4️⃣ Função que troca o conteúdo da área principal ---
  function loadSection(section) {
    switch (section) {
      case "inicio":
        content.innerHTML = `
         <div class="page-title">Cadastro Pendente</div>

         <div class="card-info">
          <p>Seu Cadastro está sob análise</p>
          <p>Previsão de resposta em até 3 dias úteis via email.</p>
            </div>
        `;
        break;

      case "basicas":
        content.innerHTML = `
            <div class="page-title">Dados de Cadastro</div>
            <div class="section-title">
                <span>Informações básicas</span>
                <button class="btn-edit">Solicitar edição</button>
            </div>

            <div class="card-info">
                <div class="info-grid">
                    <p><strong>Razão Social</strong><br>TechNova Solutions</p>
                    <p><strong>CNPJ</strong><br>85.326.123/0001-70</p>

                    <p><strong>Nome fantasia</strong><br>TechNova Solutions</p>
                    <p><strong>Data de fundação</strong><br>17/03/2022</p>
                </div>
            </div>
  `;
  break;


     case "descricao":
        content.innerHTML = `
            <div class="page-title">Dados de Cadastro</div>
            <div class="section-title">
                <span>Descrição da Startup</span>
                <button class="btn-edit">Solicitar edição</button>
            </div>

            <div class="card-info">
                <p><strong>Pitch</strong><br>
                Plataforma de automação inteligente para pequenas e médias empresas...
                </p>

                <p><strong>Descrição da solução</strong><br>
                A TechNova Solutions desenvolve uma plataforma SaaS...
                </p>

                <p><strong>Tecnologias utilizadas</strong></p>
                <div>
                    <span class="tag">Cloud Computing</span>
                    <span class="tag">Inteligência Artificial</span>
                    <span class="tag">Machine Learning</span>
                </div>

                <br>
                <p><strong>Modelo de Negócio</strong><br>SaaS</p>

                <br>
                <p><strong>Website</strong><br>https://www.technova.com.br</p>
                <p><strong>LinkedIn</strong><br>https://www.linkedin.com/company/technova</p>
            </div>
  `;
  break;

      case "pessoa":
        content.innerHTML = `
    <div class="page-title">Dados de Cadastro</div>
    <div class="section-title">
      <span>Pessoa de Contato</span>
      <button class="btn-edit">Solicitar edição</button>
    </div>

    <div class="card-info">
      <div class="info-grid">
        <p><strong>Nome</strong><br>Maria da Costa Campos</p>
        <p><strong>Email</strong><br>maria.costa@technova.com.br</p>

        <p><strong>Telefone</strong><br>+55 81 99999-9999</p>
        <p><strong>Função</strong><br>Founder</p>
      </div>
    </div>
  `;
  break;

      case "endereco":
  content.innerHTML = `
    <div class="page-title">Dados de Cadastro</div>
    <div class="section-title">
      <span>Endereço</span>
      <button class="btn-edit">Solicitar edição</button>
    </div>

    <div class="card-info">
      <div class="info-grid">
        <p><strong>CEP</strong><br>52200-050</p>
        <p><strong>Número</strong><br>456</p>
        
        <p><strong>Rua</strong><br>juliana.rf.parcerias@gmail.com</p>
        <p><strong>Complemento</strong><br>Casa 02</p>

        <p><strong>País</strong><br>Brasil</p>
        <p><strong>Estado/UF</strong><br>PE</p>

        <p><strong>Cidade</strong><br>Recife</p>
      </div>
    </div>
  `;
  break;

      case "documentos":
  content.innerHTML = `
    <div class="page-title">Dados de Cadastro</div>
    <div class="section-title">
      <span>Documentos</span>
      <button class="btn-edit">Solicitar edição</button>
    </div>

    <div class="card-info">
      <p><strong>Logo</strong><br>PNG · 20KB <a href="#">⬇</a></p>
      <p><strong>Cartão CNPJ</strong><br>PDF · 3.9KB <a href="#">⬇</a></p>
      <p><strong>Pitch Deck</strong><br>PDF · 50KB <a href="#">⬇</a></p>
    </div>
  `;
  break;

      case "historico":
        content.innerHTML = `
          <h2>Histórico de Solicitações</h2>
          <p>Visualize aqui todas as solicitações anteriores.</p>
        `;
        break;

      case "senha":
        content.innerHTML = `
          <h2>Alterar Senha</h2>
          <p>Funcionalidade de redefinição de senha em breve.</p>
        `;
        break;

      case "sair":
        content.innerHTML = `<h2>Você saiu do sistema.</h2>`;
        break;
    }
  }
});
