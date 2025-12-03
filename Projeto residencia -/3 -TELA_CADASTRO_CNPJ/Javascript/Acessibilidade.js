  // ===== ACESSIBILIDADE =====
  const btnAumentar = document.getElementById('btnAumentar');
  if (btnAumentar) {
    btnAumentar.onclick = () => {
      document.body.style.fontSize = 'larger';
    };
  }

  const btnLibras = document.getElementById('btnLibras');
  if (btnLibras) {
    btnLibras.onclick = () => {
      alert('Plugin de Libras ativado (simulação).');
    };
  }

  // Botão de leitura em voz alta: suporte a iniciar/parar, teclado e ARIA
  const btnAudio =
    document.querySelector('.btn-audio') || document.getElementById('btnAudio');
  if (btnAudio) {
    btnAudio.setAttribute('role', 'button');
    btnAudio.setAttribute('aria-pressed', 'false');
    btnAudio.setAttribute('title', 'Ler em voz alta');

    let utterance = null;
    let isReading = false;

    function getReadableText() {
      const prefer =
        document.getElementById('conteudo-detalhe') ||
        document.querySelector('main') ||
        document.body;
      try {
        // Usar innerText para obter versão mais amigável ao usuário
        return prefer.innerText.trim() || document.body.innerText.trim();
      } catch (e) {
        return document.body.innerText.trim();
      }
    }

    function updateButtonState(reading) {
      isReading = !!reading;
      btnAudio.setAttribute('aria-pressed', String(isReading));
      btnAudio.setAttribute(
        'title',
        isReading ? 'Parar leitura' : 'Ler em voz alta'
      );
      if (isReading) {
        btnAudio.classList.add('is-reading');
      } else {
        btnAudio.classList.remove('is-reading');
      }
    }

    function stopReading() {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (utterance) {
        utterance.onend = null;
        utterance.onerror = null;
        utterance = null;
      }
      updateButtonState(false);
    }

    function startReading() {
      if (!('speechSynthesis' in window)) {
        alert('Leitura em voz alta não suportada neste navegador.');
        return;
      }
      const text = getReadableText();
      if (!text) return;
      // cancelar qualquer fila anterior
      window.speechSynthesis.cancel();
      utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 1; // ritmo normal
      utterance.pitch = 1;

      utterance.onend = () => {
        updateButtonState(false);
      };
      utterance.onerror = (e) => {
        console.warn('Erro na síntese de voz', e);
        updateButtonState(false);
      };
      updateButtonState(true);
      try {
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn('Falha ao iniciar síntese de voz', e);
        updateButtonState(false);
      }
    }

    function toggleReading(e) {
      if (e && e.preventDefault) e.preventDefault();
      if (isReading) stopReading();
      else startReading();
    }

    btnAudio.addEventListener('click', toggleReading);
    btnAudio.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        toggleReading(e);
      }
    });

    // Se a aba ficar oculta, pausamos/paramos a leitura para evitar surpresas.
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && isReading) {
        stopReading();
      }
    });
  }

  // Proxy do botão VLibras: quando o botão customizado for clicado,
  // acionamos o botão do plugin (elemento com atributo `vw-access-button`).
  const btnVlibrasCustom = document.querySelector('.btn-vlibras');
  function attemptClickVlibras() {
    const vlBtn = document.querySelector('[vw-access-button]');
    if (vlBtn) {
      try {
        vlBtn.click();
        return true;
      } catch (e) {
        console.warn('Erro ao clicar no botão VLibras', e);
      }
    }
    return false;
  }
  if (btnVlibrasCustom) {
    function handleCustomVlibrasActivation(e) {
      if (e && e.preventDefault) e.preventDefault();
      console.debug('Custom VLibras button activated', {
        page: location.pathname,
      });
      // tenta imediatamente; se não existir ainda, faz retries
      if (!attemptClickVlibras()) {
        let retries = 0;
        const maxRetries = 50; // ~10s com intervalo 200ms
        const interval = setInterval(() => {
          const found = attemptClickVlibras();
          retries++;
          console.debug('VLibras retry', { retries, found });
          if (found || retries >= maxRetries) {
            clearInterval(interval);
            if (!found) {
              console.warn(
                'Botão VLibras não encontrado após várias tentativas.'
              );
            }
          }
        }, 200);
      }
    }

    btnVlibrasCustom.addEventListener('click', handleCustomVlibrasActivation);
    // Accessibility: activate with Enter or Space when focused
    btnVlibrasCustom.setAttribute('tabindex', '0');
    btnVlibrasCustom.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleCustomVlibrasActivation(e);
      }
    });
  }

// --- Painel de Acessibilidade (criado dinamicamente) ---
(function createAccessPanel() {
  // wrapper fixo (preenche a viewport) com painel posicionado absolute dentro
  if (document.getElementById('access-panel-wrapper')) return;

  const wrapper = document.createElement('div');
  wrapper.id = 'access-panel-wrapper';
  wrapper.style.position = 'fixed';
  wrapper.style.inset = '0';
  wrapper.style.pointerEvents = 'none';
  wrapper.style.zIndex = '9999';
  wrapper.style.display = 'none';

  const panel = document.createElement('div');
  panel.id = 'access-panel';
  // o painel em si usa position absolute (relativo ao wrapper fixo)
  panel.style.position = 'absolute';
  panel.style.right = '0';
  panel.style.top = '80px';
  panel.style.width = '324px';
  panel.style.height = '620px';
  panel.style.background = 'white';
  panel.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.25)';
  panel.style.overflow = 'hidden';
  panel.style.borderTopLeftRadius = '30px';
  panel.style.borderBottomLeftRadius = '30px';
  panel.style.pointerEvents = 'auto';
  panel.style.padding = '0';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Ferramentas de acessibilidade');

  // conteúdo (adaptado da base fornecida) com ícones aplicados diretamente
  panel.innerHTML = `
    <div style="position:relative;width:100%;height:100%;font-family:Poppins, Arial, sans-serif;color:black">
      <div style="left:88px;top:27px;position:absolute;font-size:24px;font-weight:600;">Ferramentas de <br/>Acessibilidade</div>

      <div style="position:absolute;left:36px;top:120px;display:flex;flex-direction:column;gap:18px;width:252px">
        <button data-action="increase" style="display:flex;align-items:center;gap:14px;padding:8px;border:0;background:transparent;cursor:pointer;font-size:20px;text-align:left"> 
          <img class="access-icon" src="../../A - Acessibilidade/img/icone-aumentar-texto.png" alt="aumentar" />
          <span>Aumentar texto</span>
        </button>

        <button data-action="decrease" style="display:flex;align-items:center;gap:14px;padding:8px;border:0;background:transparent;cursor:pointer;font-size:20px;text-align:left"> 
          <img class="access-icon" src="../../A - Acessibilidade/img/icone-diminuir-texto.png" />
          <span>Diminuir texto</span>
        </button>

        <button data-action="grayscale" style="display:flex;align-items:center;gap:14px;padding:8px;border:0;background:transparent;cursor:pointer;font-size:20px;text-align:left"> 
          <img class="access-icon" src="../../A - Acessibilidade/img/icone-escala-cinza.png" />
          <span>Escala de cinza</span>
        </button>

        <button data-action="contrast" style="display:flex;align-items:center;gap:14px;padding:8px;border:0;background:transparent;cursor:pointer;font-size:20px;text-align:left"> 
          <img class="access-icon" src="../../A - Acessibilidade/img/icone-fundo-claro.png" alt="alto-contraste" />
          <span>Alto contraste</span>
        </button>

        <button data-action="invert" style="display:flex;align-items:center;gap:14px;padding:8px;border:0;background:transparent;cursor:pointer;font-size:20px;text-align:left"> 
          <img class="access-icon" src="../../A - Acessibilidade/img/icone-contraste-negativo.png" alt="contraste-negativo" />
          <span>Contraste negativo</span>
        </button>

        <button data-action="fundo-claro" style="display:flex;align-items:center;gap:14px;padding:8px;border:0;background:transparent;cursor:pointer;font-size:20px;text-align:left"> 
          <img class="access-icon" src="../../A - Acessibilidade/img/icone-fundo-claro.png" alt="fundo-claro" />
          <span>Fundo claro</span>
        </button>

        <button data-action="reset" style="display:flex;align-items:center;gap:14px;padding:8px;border:0;background:transparent;cursor:pointer;font-size:20px;text-align:left"> 
          <img class="access-icon" src="../../A - Acessibilidade/img/icone-redefinir.png" alt="redefinir" />
          <span>Redefinir</span>
        </button>
      </div>

      <button id="access-panel-close" aria-label="Fechar painel" style="position:absolute;right:12px;top:12px;border:0;background:transparent;cursor:pointer;font-size:18px">✕</button>
    </div>
    `
  ;

  wrapper.appendChild(panel);
  document.body.appendChild(wrapper);

  // aplicar imagens de ícone a partir da pasta imagens/acessibilidade
  (function applyIconImages() {
    const mapping = {
      increase: 'icone-aumentar-texto',
      decrease: 'icone-diminuir-texto',
      grayscale: 'icone-escala-cinza',
      contrast: 'icone-contraste-negativo',
      invert: 'icone-contraste-negativo',
      'fundo-claro': 'icone-fundo-claro',
      reset: 'icone-redefefinir',
    };

    const buttons = panel.querySelectorAll('[data-action]');
    buttons.forEach((btn) => {
      const action = btn.getAttribute('data-action');
      const name = mapping[action] || action;
      const img = btn.querySelector('.access-icon');

      // NÃO criar placeholders — apenas ajustar imagens já presentes
      if (!img) return;

      // se já possui src, preservamos
      if (img.getAttribute('src')) return;

      // se existe <img> mas sem src, tentamos png -> svg
      img.alt = action;
      img.src = `../../A - Acessibilidade/img/${name}.png`;
      img.addEventListener(
        'error',
        function onFirstError() {
          img.removeEventListener('error', onFirstError);
          img.src = `../../A - Acessibilidade/img/${name}.svg`;
        },
        { once: true }
      );
    });
  })();

  // styles para classes de acessibilidade (injetadas uma vez)
  if (!document.getElementById('access-panel-styles')) {
    const style = document.createElement('style');
    style.id = 'access-panel-styles';
    style.innerHTML = `
      .access-high-contrast { background: #000 !important; color: #fff !important }
      .access-invert { filter: invert(100%) hue-rotate(180deg) !important }
      .access-grayscale { filter: grayscale(100%) !important }
      .access-readable-bg { background: #fff !important; color: #000 !important }
      /* ícones placeholders padronizados (suporta <img> e elementos de bloco) */
      #access-panel .access-icon { width:30px; height:30px; display:block; object-fit:contain; border-radius:6px; flex:0 0 30px }
    `;
    document.head.appendChild(style);
  }

  // estado da fonte via zoom (simples e compatível)
  let fontScale = 1;

  function openPanel() {
    wrapper.style.display = 'block';
    wrapper.style.pointerEvents = 'auto';
    // pequena animação
    panel.style.transform = 'translateX(8px)';
    panel.style.transition = 'transform 160ms ease-out';
    setTimeout(() => (panel.style.transform = 'translateX(0)'), 10);
    panel.querySelector('[data-action]')?.focus();
  }

  function closePanel() {
    panel.style.transform = 'translateX(8px)';
    setTimeout(() => {
      wrapper.style.display = 'none';
      wrapper.style.pointerEvents = 'none';
    }, 160);
  }

  // ações
  function increaseText() {
    fontScale = +(fontScale * 1.1).toFixed(2);
    document.body.style.zoom = String(fontScale);
  }
  function decreaseText() {
    fontScale = +(fontScale / 1.1).toFixed(2);
    if (fontScale < 0.5) fontScale = 0.5;
    document.body.style.zoom = String(fontScale);
  }
  function toggleClass(cls) {
    document.body.classList.toggle(cls);
  }
  function resetAccess() {
    fontScale = 1;
    document.body.style.zoom = '';
    document.body.classList.remove(
      'access-high-contrast',
      'access-invert',
      'access-grayscale',
      'access-readable-bg'
    );
  }

  // delegação de eventos
  panel.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    switch (action) {
      case 'increase':
        increaseText();
        break;
      case 'decrease':
        decreaseText();
        break;
      case 'grayscale':
        toggleClass('access-grayscale');
        break;
      case 'contrast':
        toggleClass('access-high-contrast');
        break;
      case 'invert':
        toggleClass('access-invert');
        break;
      case 'readable':
      case 'fundo-claro':
        toggleClass('access-readable-bg');
        break;
      case 'reset':
        resetAccess();
        break;
    }
  });

  // abrir/fechar via botão existente `.btn-acess`
  const trigger = document.querySelector('.btn-acess');
  if (trigger) {
    trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (wrapper.style.display === 'block') {
        closePanel();
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        openPanel();
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // fechar ao clicar fora do painel
  wrapper.addEventListener('click', (e) => {
    if (e.target === wrapper) {
      closePanel();
      trigger?.setAttribute('aria-expanded', 'false');
    }
  });

  // botão fechar
  wrapper
    .querySelector('#access-panel-close')
    ?.addEventListener('click', () => {
      closePanel();
      trigger?.setAttribute('aria-expanded', 'false');
    });

  // fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && wrapper.style.display === 'block') {
      closePanel();
      trigger?.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Render function
function render(lista) {
  const area = document.getElementById('resultados');
  area.innerHTML = '';
  lista.forEach((s) => {
    area.innerHTML += `
      <div class="card-resultado">
        <div class="card-resultado-topo">
          <img class="card-resultado-img" src="${s.imagem}" />
          <div class="card-resultado-info">
            <div class="card-resultado-nome">${s.nome}</div>
            <div class="card-resultado-segmento">${
              s.segmento.charAt(0).toUpperCase() + s.segmento.slice(1)
            }</div>
            <div class="card-resultado-descricao">${s.descricao}</div>
            <div class="card-resultado-tecnologias">
              ${s.tecnologias
                .map((t) => `<div class="card-resultado-tec">${t}</div>`)
                .join('')}
            </div>
          </div>
        </div>
        <div class="card-resultado-link">
          <a href="detalhamento.html?nome=${encodeURIComponent(
            s.nome
          )}">Saber mais</a>
        </div>
      </div>
    `;
  });
}

// Busca por texto
function buscar() {
  let texto = document.getElementById('searchInput').value.toLowerCase();
  let filtradas = startups.filter(
    (s) =>
      s.nome.toLowerCase().includes(texto) ||
      s.descricao.toLowerCase().includes(texto)
  );
  render(filtradas);
}

// Aplicar filtros
function aplicarFiltros() {
  let selecionados = [...document.querySelectorAll('.filtro-seg:checked')].map(
    (i) => i.value
  );
  let filtradas = startups.filter((s) => selecionados.includes(s.segmento));
  render(filtradas);
}

// Limpar
function limparFiltros() {
  document.querySelectorAll('.filtro-seg').forEach((i) => (i.checked = false));
  render(startups);
}

// (Handlers movidos para o listener de DOMContentLoaded)

function renderDetalhe() {
  const nome = getStartupNome();
  const startup = startups.find((s) => s.nome === nome) || startups[0];
  const el = document.getElementById('conteudo-detalhe');
  el.innerHTML = `
    <section class="detalhe-main">
      <a href="index.html" class="detalhe-voltar">
        <span style="font-size:2rem;vertical-align:middle;">&#8592;</span> Voltar
      </a>
      <h2 class="detalhe-nome">${startup.nome}</h2>
      <div class="detalhe-img-descricao">
        <div class="detalhe-img-links">
          <img class="detalhe-img" src="${
            startup.imagem
          }" alt="Logo da startup" />
          <div class="detalhe-links">
            <a class="detalhe-link" href="${
              startup.links.pitchdesk
            }" target="_blank">Pitch Desk</a>
            <a class="detalhe-link" href="${
              startup.links.site
            }" target="_blank">Site</a>
            <a class="detalhe-link" href="${
              startup.links.linkedin
            }" target="_blank">Linkedin</a>
            <a class="detalhe-link" href="${
              startup.links.whatsapp
            }" target="_blank">Whatsapp</a>
          </div>
        </div>
        <p class="detalhe-descricao">${startup.descricao}</p>
      </div>
      <div class="detalhe-info-basica">
        <h3 class="detalhe-titulo">Informações básicas</h3>
        <div class="detalhe-info-grid">
          <div>
            <strong>Razão Social:</strong><br>
            <span>${startup.razaoSocial}</span>
          </div>
          <div>
            <strong>CNPJ:</strong><br>
            <span>${startup.cnpj}</span>
          </div>
          <div>
            <strong>Nome fantasia:</strong><br>
            <span>${startup.nomeFantasia}</span>
          </div>
          <div>
            <strong>Data de fundação:</strong><br>
            <span>${startup.fundacao}</span>
          </div>
        </div>
      </div>
      <div class="detalhe-sobre">
        <h3 class="detalhe-titulo">Sobre a startup</h3>
        <div class="detalhe-sobre-grid">
          <div class="detalhe-sobre-esquerda">
            <strong>Pitch:</strong>
            <p>${startup.pitch}</p>
          </div>
          <div class="detalhe-sobre-direita">
            <div>
              <strong>Modelo de Negócios:</strong><br>
              <span>${startup.modeloNegocio}</span>
            </div>
            <div>
              <strong>Tecnologias utilizadas:</strong>
              <div class="detalhe-tecnologias">
                ${startup.tecnologias
                  .map((t) => `<span class="detalhe-tec">${t}</span>`)
                  .join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
