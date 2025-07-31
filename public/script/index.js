function enviarDados() {
  let nomeInput = document.getElementById('nome-completo');
  let nota1Input = document.getElementById('nota1');
  let nota2Input = document.getElementById('nota2');

  nome = nomeInput.value;
  nota1 = nota1Input.value;
  nota2 = nota2Input.value;

  axios
    .post('http://localhost:3000/notas', {
      nome: nome,
      notas: [nota1, nota2],
    })
    .then((response) => {
      console.log('Resposta:', response.data);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Usuario criado com sucesso',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'meu-alerta',
        }
      });

      nomeInput.value = '';
      nota1Input.value = '';
      nota2Input.value = '';
      nota2Input.placeholder = '0 a 10';
    })
    .catch((error) => {
      console.error('Erro ao enviar: ', error);
    });
}
