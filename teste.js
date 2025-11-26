/* main.js — controla menu, submenus, troca de telas e filtros simples */

document.addEventListener("DOMContentLoaded", () => {
  // === Helpers ===
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // === MENU: abrir/fechar submenus ===
  $$(".dropdown-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const group = btn.parentElement;
      group.classList.toggle("open");
    });
  });

  // === Troca de telas (sections) ===
  function showPage(id) {
    // hide all
    $$(".page").forEach(p => p.classList.remove("visible"));
    const target = document.getElementById(id);
    if (target) target.classList.add("visible");

    // atualizar active do menu
    $$(".menu-item, .submenu-item").forEach(i => i.classList.remove("active"));
    // achar menu/submenu que tem data-target=id
    const link = document.querySelector(`[data-target="${id}"]`);
    if (link) {
      link.classList.add("active");
      // se for submenu, abrir o grupo pai
      const parentGroup = link.closest(".menu-group");
      if (parentGroup) parentGroup.classList.add("open");
    }
  }

  // inicial: dashboard
  showPage("tela-dashboard");

  // links do menu
  $$(".menu-item[data-target], .submenu-item[data-target]").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      const id = a.getAttribute("data-target");
      if (id) showPage(id);
    });
  });

  // === DASHBOARD: busca simples ===
  const dashSearch = $("#dash-search");
  if (dashSearch) {
    dashSearch.addEventListener("input", () => {
      const term = dashSearch.value.trim().toLowerCase();
      const rows = $$("#dash-table tbody tr");
      rows.forEach(r => {
        const text = r.textContent.toLowerCase();
        r.style.display = text.includes(term) ? "" : "none";
      });
    });
  }

  // === Exemplos de filtros de tabela (Startups / Usuários / Aprovações) ===
  function basicFilter(tableId, statusSelectId) {
    const btn = document.getElementById(tableId + "-filter") || null;
    // If a button exists, wire up; else, filter on select change
    const select = document.getElementById(statusSelectId);
    if (!select) return;
    select.addEventListener("change", () => {
      const val = select.value.toLowerCase();
      $(`#${tableId}-table`)?.querySelectorAll("tbody tr")?.forEach(tr => {
        if (val === "todos" || val === "") {
          tr.style.display = "";
        } else {
          const txt = tr.textContent.toLowerCase();
          tr.style.display = txt.includes(val) ? "" : "none";
        }
      });
    });
    if (btn) {
      btn.addEventListener("click", () => {
        // trigger select change handler (works as simple_demo)
        select.dispatchEvent(new Event("change"));
      });
    }
  }

  // wire simple filters
  basicFilter("startups", "startups-status");
  basicFilter("usuarios", "usuarios-status");
  basicFilter("aprov", "aprov-status");

  // === TABELA AÇÕES ===
  // Desativar (remove linha)
  document.addEventListener("click", (e) => {
    if (e.target.matches(".btn-danger")) {
      const row = e.target.closest("tr");
      if (!row) return;
      // efeito visual antes de remover
      row.style.transition = "opacity .25s ease, transform .25s ease";
      row.style.opacity = "0.25";
      row.style.transform = "scale(.995)";
      setTimeout(() => row.remove(), 220);
    }
    // approve / reject buttons (aprovacoes)
    if (e.target.matches(".btn-approve")) {
      const row = e.target.closest("tr");
      if (!row) return;
      // substituir por tag "Aprovado" na mesma linha — aqui apenas mostra anotação
      const cell = row.querySelector("td:last-child");
      if (cell) {
        cell.innerHTML = '<span class="tag tag--success">Aprovado</span>';
      }
    }
    if (e.target.matches(".btn-reject")) {
      const row = e.target.closest("tr");
      if (!row) return;
      const cell = row.querySelector("td:last-child");
      if (cell) {
        cell.innerHTML = '<span class="tag red">Rejeitado</span>';
      }
    }
  });

  // detalhes (exemplo: abrir alert com info)
  document.addEventListener("click", (e) => {
    if (e.target.matches(".btn-details")) {
      const row = e.target.closest("tr");
      if (!row) return;
      const cols = Array.from(row.querySelectorAll("td")).map(td => td.textContent.trim());
      alert("Detalhes:\n" + cols.join(" | "));
    }
  });

  // Ajuste: fechar todos submenus ao clicar fora
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".menu")) {
      $$(".menu-group").forEach(g => g.classList.remove("open"));
    }
  });

  // Suporte: atalhos via querystring ?page=tela-startups
  const params = new URLSearchParams(location.search);
  const page = params.get("page");
  if (page) {
    const valid = document.getElementById(page);
    if (valid) showPage(page);
  }
});
