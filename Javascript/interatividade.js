<script>
  let idiomaAtual = "pt";

  function trocarIdioma() {
    if (idiomaAtual === "pt") {
      document.documentElement.lang = "en";
      document.querySelector("#itemacessar").textContent = "Access";
      document.querySelector("#botao-idioma").textContent = "🌐 EN/PT";
      idiomaAtual = "en";
    } else {
      document.documentElement.lang = "pt-BR";
      document.querySelector("#itemacessar").textContent = "Acessar";
      document.querySelector("#botao-idioma").textContent = "🌐 PT/EN";
      idiomaAtual = "pt";
    }
  }
</script>
