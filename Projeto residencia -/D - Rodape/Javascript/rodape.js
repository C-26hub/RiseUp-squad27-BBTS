document.addEventListener("DOMContentLoaded", () => {
  fetch("/D - RODAPE/rodape.html")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar rodapé: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      // Insere o rodapé no final da página
      document.body.insertAdjacentHTML("beforeend", html);

      // Corrige automaticamente caminhos relativos que possam ter escapado
      document.querySelectorAll("footer img").forEach(img => {
        if (img.getAttribute("src")?.startsWith("../")) {
          img.src = img.src.replace("../", "/");
        }
      });
    })
    .catch(err => console.error(err));
});
