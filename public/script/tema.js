const btnTema = document.getElementById('toggle-tema');

btnTema.addEventListener('click', () => {

  //.toggle romove se presente, caso contrario adiciona
  document.body.classList.toggle('tema-escuro');

  // Salvar no localStorage
  const isDark = document.body.classList.contains('tema-escuro');
  localStorage.setItem('tema', isDark ? 'escuro' : 'claro');
});

// Aplicar tema salvo (ao carregar a página)
window.addEventListener('DOMContentLoaded', () => {
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'escuro') {
    document.body.classList.add('tema-escuro');
  } 
});
