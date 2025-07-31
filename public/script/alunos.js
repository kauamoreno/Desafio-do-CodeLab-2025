document.addEventListener('DOMContentLoaded', async () => {
  buscaAlunos();
});

async function buscaAlunos() {
  let alunos;

  await axios
    .get('http://localhost:3000/notas')
    .then((response) => {
      alunos = response.data;
      console.log(alunos);
    })
    .catch((error) => {
      console.error('Erro:', error);
      alunos = [];
    });

  const main = document.querySelector('main');

  // Remove lista antiga para não duplicar
  const listaAntiga = document.getElementById('lista-alunos');
  if (listaAntiga) {
    main.removeChild(listaAntiga);
  }

  if (!alunos || alunos.length === 0) {

    // Mostrar mensagem quando não tiver alunos
    const mensagem = document.getElementById('sem-alunos');
    if(mensagem) {
      mensagem.style = 'display: block';
    }

    return;
  } else {
    // Remove mensagem se existir
    const msgAntiga = document.getElementById('sem-alunos');
    if (msgAntiga) {
      main.removeChild(msgAntiga);
    }
  }

  const listaAlunos = document.createElement('div');
  listaAlunos.id = 'lista-alunos';

  for (let i = 0; i < alunos.length; i++) {
    let media = (Number(alunos[i].notas[0]) + Number(alunos[i].notas[1])) / 2;
    let situacao = media > 6 ? 'Aprovado' : 'Reprovado';

    listaAlunos.innerHTML += `
        <div>
            <p><b>Aluno:</b> ${alunos[i].nome}</p>
            <p><b>Média:</b> ${media}</p>
            <p><b>Situação:</b> ${situacao}</p>
        </div>
    `;
  }

  main.appendChild(listaAlunos);
}

async function deletaTodoMundo() {
  await axios
    .delete('http://localhost:3000/notas-delete')
    .then((response) => {
      console.log('Deletado com sucesso:', response.data);
    })
    .catch((error) => {
      console.error('Erro ao deletar:', error);
    });

    // Mostrar mensagem quando não tiver alunos
    const mensagem = document.getElementById('sem-alunos');
    if(mensagem) {
      mensagem.style = 'display: block';
    }

  buscaAlunos();
}