# 📚 Sistema de Cadastro e Avaliação de Alunos – CodeLab 2025

📄 [Enunciado do desafio](Desafio_do_CodeLab_2025.pdf)
<br>

## 🎯 Objetivos

✅ Tela de Cadastro (`index.html`)

- Formulário com campos: Nome, Nota 1, Nota 2
- Validação de campos (Nota entre 0 e 10, apenas números inteiros)
- Estimativa da Nota 2 com base em regressão linear (caso haja 5+ alunos)
- Tema claro/escuro com persistência

✅ Tela de Visualização (`alunos.html`)

- Listagem de todos os alunos cadastrados
- Exibição de nome, média e status ("Aprovado" ou "Reprovado")
- Opção de resetar todos os dados
- Botão de voltar ao cadastro

---

### 📡 Endpoints Express

| Método | Endpoint                       | Descrição                                       |
| ------ | ------------------------------ | ----------------------------------------------- |
| GET    | `/api/notas`                   | Retorna todos os alunos                         |
| POST   | `/api/notas`                   | Cadastra um novo aluno                          |
| GET    | `/api/estimaNota2?nota1=valor` | Retorna a estimativa da nota2 com base na nota1 |
| DELETE | `/api/notas-delete`            | Remove todos os alunos (reset)                  |
| DELETE | `/api/notas:id`                | Remove um aluno por vez (BONUS)                 |

<br>

---

## 💻 Rodando com Node.js

Para rodar este projeto com Node.js, você precisa ter o **Node.js** e o **npm** instalados.

### Passos

1.  **Instale as dependências:**
    Na raiz do projeto, execute:

    ```bash
    npm install
    ```

2.  **Execute o projeto:**
    Escolha um dos comandos:

    - **Desenvolvimento (com `nodemon`):**

      ```bash
      npm run dev
      ```

    - **Produção (com `node`):**
      ```bash
      npm start
      ```

3.  **Acesse no navegador:**
    Acesse `http://localhost:3000`.

---

## 🐳 Rodando com Docker

### Pré-requisitos

- **Docker** instalado em sua máquina. Você pode fazer o download e encontrar instruções de instalação [aqui](https://docs.docker.com/get-docker/).

### Passos

1.  **Construa a imagem Docker:**
    Navegue até a raiz do seu projeto (onde o `Dockerfile` está localizado) e execute o seguinte comando:

    ```bash
    docker build -t cadastro-alunos .
    ```

    Este comando irá criar uma imagem Docker com o nome `cadastro-alunos`.

2.  **Execute o container Docker:**
    Para iniciar o container e mapear a porta 3000 do seu host para a porta 3000 do container, use um dos comandos abaixo:

    - **Para executar em segundo plano (detached mode):**

      ```bash
      docker run -d -p 3000:3000 cadastro-alunos
      ```

      Use a flag `-d` para que o container seja executado em segundo plano, liberando seu terminal.

    - **Para executar interativamente (interactive mode) e ver os logs no terminal:**

      ```bash
      docker run -it -p 3000:3000 cadastro-alunos
      ```

      A flag `-it` permite que você interaja com o container e veja a saída dos logs diretamente no seu terminal.

3.  **Acesse o sistema no navegador:**
    Após o container ser iniciado, você pode acessar a aplicação abrindo seu navegador e digitando o seguinte endereço:

    ```
    http://localhost:3000
    ```

---

## ✅ Rodando os Testes

Para garantir que o projeto está funcionando corretamente, você pode executar os testes automatizados.
A cobertura esta sobre todas as endpoinsts do projeto

### Pré-requisitos

Você já deve ter as **dependências do projeto instaladas**. Se ainda não as instalou, siga o passo 1 da seção "Rodando com Node.js":

```bash
npm test
```

---

## Licença

Este projeto está sob a licença MIT, para mais informações consulte o arquivo [LICENSE](LICENSE) .
<br><br>

> Feito por Kauã Moreno

[![linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kauamoreno/)
[![email](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:kmoreno.tech@gmail.com)
