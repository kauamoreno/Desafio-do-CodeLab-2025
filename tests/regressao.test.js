const { regressaoLinear } = require('../public/script/estima_nota');

describe('regressaoLinear()', () => {
  it('deve calcular a e b corretamente com dados simulados', async () => {
    const dadosFake = [
      { notas: [6, 7] },
      { notas: [8, 9] },
      { notas: [5, 6.2] },
      { notas: [9, 9.5] },
      { notas: [4, 5.5] },
    ];

    const { a, b } = await regressaoLinear(dadosFake);

    //toBeCloseTo(valorEsperado, precisao(1 para erro < 0.05))
    expect(a).toBeCloseTo(0.83, 1);
    expect(b).toBeCloseTo(2.08, 1);
  });

  it('deve calcular a e b para y = 2x + 0', async () => {
    const dadosFake = [
      { notas: [1, 2] },
      { notas: [2, 4] },
      { notas: [3, 6] },
      { notas: [4, 8] },
      { notas: [5, 10] },
    ];

    const { a, b } = await regressaoLinear(dadosFake);

    expect(a).toBeCloseTo(2, 1);
    expect(b).toBeCloseTo(0, 1);
  });
});
