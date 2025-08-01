const btnTema = document.querySelectorAll('.toggle-tema');

const iconeSol = '../image/icons/sun.svg';
const iconeLua = '../image/icons/moon.svg';

function atualizarTema(isEscuro) {
  // Atualiza a classe do body e salva no localStorage
  document.body.classList.toggle('tema-escuro', isEscuro);
  localStorage.setItem('tema', isEscuro ? 'escuro' : 'claro');

  // Atualiza todos os ícones
  btnTema.forEach((btn) => {
    const iconeTema = btn.querySelector('.icone-tema');
    if (iconeTema) {
      iconeTema.src = isEscuro ? iconeSol : iconeLua;
    }
  });
}

// Clique em qualquer botão ativa/desativa o tema e atualiza todos
btnTema.forEach((btn) => {
  btn.addEventListener('click', () => {
    const isEscuro = !document.body.classList.contains('tema-escuro');
    atualizarTema(isEscuro);
  });
});

// Ao carregar a página, aplicar o tema salvo
window.addEventListener('DOMContentLoaded', () => {
  const temaSalvo = localStorage.getItem('tema');
  const isEscuro = temaSalvo === 'escuro';
  atualizarTema(isEscuro);
});
