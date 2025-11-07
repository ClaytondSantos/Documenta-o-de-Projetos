const projects = [
  {
    id: 'proj-exemplo-1',
    name: 'Jogo Distribuído - Fitch Fatch',
    description: 'É um jogo semelhante ao Jogo da Velha, com funcionalidades multiplayer em tempo real usando Node.js e Socket.IO.',
    github: 'https://github.com/ClaytondSantos/Jogo-da-velha-multiplayer-usando-Socket.IO',
    tags: ['Dev-game', 'Game']
  },
  {
    id: 'proj-exemplo-2',
    name: 'Hotel Sistema de Reserva',
    description: 'Sistema de reserva de hotel utilizando API e Node.js.',
    github: 'https://github.com/ClaytondSantos/Hotel-Sistema-de-Reservas-Hotel',
    tags: ['API', 'Hotel']
  }
];

const grid = document.getElementById('projectsGrid');
const searchInput = document.getElementById('search');

function escapeHtml(s) {
  return s.replace(/[&<>\"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function makeCard(p) {
  const el = document.createElement('div');
  el.className = 'card';
  el.innerHTML = `
    <h3>${escapeHtml(p.name)}</h3>
    <p>${escapeHtml(p.description)}</p>
    <div class="meta">
      <div style="font-size:12px;color:var(--muted)">${escapeHtml((p.tags || []).join(', '))}</div>
      <div style="display:flex;gap:8px">
        <a class="btn" href="${p.github}" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
  `;
  return el;
}

function render(list) {
  grid.innerHTML = '';
  if (list.length === 0) {
    grid.innerHTML = '<div style="color:var(--muted)">Nenhum projeto encontrado.</div>';
    return;
  }
  list.forEach(p => grid.appendChild(makeCard(p)));
}

function normalize(s) {
  return (s || '').toLowerCase();
}

function matches(p, q) {
  q = normalize(q);
  if (!q) return true;
  return normalize(p.name).includes(q) ||
         normalize(p.description).includes(q) ||
         (p.tags || []).join(' ').includes(q);
}

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim();
  render(projects.filter(p => matches(p, q)));
});

document.getElementById('clear').addEventListener('click', () => {
  searchInput.value = '';
  render(projects);
  searchInput.focus();
});

// render inicial
render(projects);
