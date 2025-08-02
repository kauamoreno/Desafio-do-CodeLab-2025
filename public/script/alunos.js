document.addEventListener('DOMContentLoaded', async () => {
  buscaAlunos();
});

const btnApagarTudo = document.getElementById('btn-deletar');
const mensagemSemAluno = document.getElementById('sem-alunos');

async function buscaAlunos() {
  let alunos;

  await axios
    .get('http://localhost:3000/api/notas')
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
    // Esconde btn de apagar tudo
    mensagemSemAluno.style = 'display: block';
    btnApagarTudo.style = 'display: none';

    return;
  } else {
    mensagemSemAluno.style = 'display: none';
    btnApagarTudo.style = 'display: block';
  }

  const listaAlunos = document.createElement('div');
  listaAlunos.id = 'lista-alunos';

  for (let i = 0; i < alunos.length; i++) {
    let media = (Number(alunos[i].notas[0]) + Number(alunos[i].notas[1])) / 2;
    let situacao = media > 6 ? 'Aprovado' : 'Reprovado';
    let classeSituacao =
      situacao === 'Aprovado' ? 'situacao-aprovado' : 'situacao-reprovado';

    listaAlunos.innerHTML += `
        <div>
            <p><b>Aluno:</b> ${alunos[i].nome}</p>
            <p><b>Média:</b> ${media}</p>
            <p><b>Situação:</b> <span class="${classeSituacao}">${situacao}</span></p>
        </div>
    `;
  }

  main.appendChild(listaAlunos);
}

function deletaPopup() {
  Swal.fire({
    title: 'Tem certeza?',
    text: "Não sera possível reverter essa ação!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, deletar!',
  }).then((result) => {
    if (result.isConfirmed) {
      deletaTodoMundo();
      
      Swal.fire({
        title: 'Deletado!',
        text: 'As notas foram deletadas',
        icon: 'success',
      });
    } 
  });
}

async function deletaTodoMundo() {
  await axios
    .delete('http://localhost:3000/api/notas-delete')
    .then((response) => {
      console.log('Deletado com sucesso:', response.data);
    })
    .catch((error) => {
      console.error('Erro ao deletar:', error);
    });

  // Mostrar mensagem quando não tiver alunos
  mensagemSemAluno.style = 'display: block';
  btnApagarTudo.style = 'display: none';

  buscaAlunos();
}