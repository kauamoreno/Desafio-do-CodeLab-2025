let inputNota1 = document.getElementById('nota1');
let inputNota2 = document.getElementById('nota2');

// Chamando a func estimaNota2 e atribuindo no placeholder da nota2
inputNota1.addEventListener('input', async () => {

  try {

    if(inputNota2.value !== '') return;
    
    // Passa o nota1 na query string ?nota1=valor
    const nota1 = parseFloat(inputNota1.value);
    const response = await axios.get('http://localhost:3000/api/estimaNota2', {
      params: { nota1: nota1 },
    });

    let notaEstimada = response.data?.nota2Estimada;

    if (notaEstimada != null) {
      inputNota2.placeholder = 'Nota Estimada: ' + notaEstimada;
    } else {
      inputNota2.placeholder = '0 a 10'
    }

  } catch (error) {
    console.error('Erro ao buscar nota estimada:', error);
    inputNota2.placeholder = 'Erro ao estimar';
  }
});
