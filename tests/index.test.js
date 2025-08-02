const request = require('supertest');
const app = require('../src/server');

describe('Testando CRD /notas', () => {
  describe('400 - Variações de notas como strings não numericas e numeros n permitidos', () => {
    const casos = [
      {
        descricao: 'Numero acima do permitido',
        entrada: { nome: 'Teste', notas: [12, 0] },
      },
      {
        descricao: 'Numero abaixo do permitido',
        entrada: { nome: 'Teste', notas: [0, -1] },
      },
      {
        descricao: 'Notas como string n numerica',
        entrada: { nome: 'Maria', notas: ['teste', 'nota'] },
      },
    ];

    test.each(casos)('$descricao', async ({ entrada }) => {
      const res = await request(app).post('/api/notas').send(entrada);
      expect(res.statusCode).toBe(400);
    });
  });

  describe('201 - Variações de nomes e notas', () => {
    const casos = [
      {
        descricao: 'Notas como string numerica',
        entrada: { nome: 'Teste', notas: ['2', '10'] },
        esperado: { nome: 'Teste', notas: [2, 10] },
      },
      {
        descricao: 'Notas como número misturado com string numerica',
        entrada: { nome: 'Fulano', notas: [10, '8'] },
        esperado: { nome: 'Fulano', notas: [10, 8] },
      },
      {
        descricao: 'Notas com espaços',
        entrada: { nome: '     Teste     ', notas: ['  2   ', 10] },
        esperado: { nome: 'Teste', notas: [2, 10] },
      },
      {
        descricao: 'Nome com HTML e notas como string',
        entrada: { nome: '<b>Maria</b>  ', notas: ['5', '9'] },
        esperado: { nome: 'Maria', notas: [5, 9] },
      },
      {
        descricao: 'Nome com espaço',
        entrada: { nome: '       TESTE        ', notas: ['5', '9'] },
        esperado: { nome: 'TESTE', notas: [5, 9] },
      },
    ];

    test.each(casos)('$descricao', async ({ entrada, esperado }) => {
      const res = await request(app).post('/api/notas').send(entrada);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('usuario');
      expect(res.body.usuario.nome).toBe(esperado.nome);
      expect(res.body.usuario.notas).toEqual(esperado.notas);
    });
  });

  it('Deve listar notas', async () => {
    const res = await request(app).get('/api/notas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Deve apagar todas as notas com sucesso', async () => {
    // Primeiro cria algumas notas para garantir que existam
    await request(app)
      .post('/notas')
      .send({ nome: 'Teste 1', notas: [5, 6] });
    await request(app)
      .post('/notas')
      .send({ nome: 'Teste 2', notas: [7, 8] });

    // Agora chama o endpoint de deletar
    const res = await request(app).delete('/api/notas-delete');

    // Verifica se a resposta foi sucesso
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensagem', 'Notas apagadas com sucesso.');

    // Verifica se realmente apagou todas
    const resFinal = await request(app).get('/api/notas');
    expect(resFinal.statusCode).toBe(200);
    expect(resFinal.body).toEqual([]);
  });
});
