const axios = require('axios');

async function estimaNota2(req, res) {

  // Recebe o valor e verifica se o numero e valido
  const nota1 = parseFloat(req.query.nota1);

  if (isNaN(nota1) || nota1 > 10 || nota1 < 0) {
    return res.status(200).json({ nota2Estimada: null });
  }

  /**
   * Verifica o tamanho minimo de dados
   * 
   * Chama a regressaoLinear() para pegar o A e B da formula
   * e retorna a Nota 2 estimada
  **/
  let dadosDB = await dados();
  if(dadosDB.length > 4) {
    let { a, b } = regressaoLinear(dadosDB);

    let resultado = a * nota1 + b;
    resultado = Number(resultado.toFixed(2))

    return res.status(200).json({ nota2Estimada: resultado });
  }

  return res.status(200).json({ nota2Estimada: null });
}

// Consulta os dados cadastrados
async function dados() {
  try {
    const response = await axios.get('http://localhost:3000/api/notas');
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer GET:', error);
    return [];
  }
}

function regressaoLinear(dadosDB){
  
  let n = dadosDB.length;
  let x = [];
  let y = [];
  let xy = [];
  let xQuad = [];

  // Pego as notas de dadosDB 
  dadosDB.forEach(element => {
    
    /**
     * Nota 1 fica em notas[0]
     * Nota 2 fica em notas[1]
    **/

    let elX = element.notas[0];
    let elY = element.notas[1];

    // Preenchendo as var
    x.push(elX);
    y.push(elY);
    xy.push(elX * elY);
    xQuad.push(elX * elX);

  });

  /**
   * Usando .reduce para soma de array
   * funciona com um acumulador(acc) que inicia com 0 
   * e o valor incrementado
   * 
   * Mesma funcao do for, porem mais legivel
   * O(N) 
  **/
  let somaX = x.reduce((acc, val) => acc + val, 0);
  let somaY = y.reduce((acc, val) => acc + val, 0);
  let somaXY = xy.reduce((acc, val) => acc + val, 0);
  let somaXQuad = xQuad.reduce((acc, val) => acc + val, 0);

  // Calculando o Coef Ang (a) e o Coef Lin (b)
  let a = ((n * somaXY) - (somaX * somaY)) / ((n * somaXQuad) - (somaX * somaX))
  let b = (somaY - (a * somaX)) / n;

  return { a, b };
}

module.exports = { estimaNota2, regressaoLinear };