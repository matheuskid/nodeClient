# 📚 Cliente Node.js para Gestão de Estudantes

Este projeto é um **cliente de terminal interativo** desenvolvido em Node.js para gerenciar diferentes tipos de estudantes por meio de uma **API REST** hospedada na nuvem.

Ele permite realizar operações de **CRUD (Create, Read, Update, Delete)** para três categorias:

- 👩‍🎓 Estudantes de Graduação  
- 🔬 Bolsistas de Iniciação Científica  
- 🎓 Estudantes de Pós-Graduação  

---

## 🚀 Funcionalidades

- ✅ Listar todos os estudantes por tipo  
- ➕ Adicionar novos registros  
- 🔄 Atualizar dados de estudantes existentes  
- ❌ Deletar estudantes pelo ID  
- 📋 Interface interativa no terminal via `inquirer`

---

## 🛠️ Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Axios](https://axios-http.com/)
- [Inquirer](https://www.npmjs.com/package/inquirer)

---

## 📦 Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/cliente-estudantes.git
cd cliente-estudantes
```

2. **Instale as dependências:**

```bash
npm install
```

---

## ▶️ Como usar

Execute o cliente com o seguinte comando:

```bash
node index.js
```

> O nome do arquivo principal pode ser diferente (`main.js`, `cliente.js`, etc.). Ajuste conforme o seu projeto.

Você verá um menu interativo no terminal, com opções como:

```
Qual tipo de estudante você deseja gerenciar?
> Estudante de Graduação
  Bolsista de Iniciação Científica
  Estudante de Pós-Graduação
  ───────────────
  Sair
```

A partir daí, você poderá listar, criar, atualizar ou excluir estudantes.

---

## 🌐 API REST

Este cliente se comunica com a seguinte API:

```
Base URL: https://student-management-k1vk.onrender.com/
```

### Endpoints utilizados

| Tipo                       | Endpoint                                  |
|----------------------------|-------------------------------------------|
| Graduação                  | `/undergraduates/`                        |
| Iniciação Científica       | `/scientifics/`                           |
| Pós-Graduação              | `/postgraduates/`                         |

As operações utilizam os métodos HTTP `GET`, `POST`, `PUT` e `DELETE`.

---

## 📋 Estrutura de Dados

### Estudante de Graduação
```json
{
  "name": "João",
  "age": 20,
  "studentId": "20230123",
  "major": "Engenharia"
}
```

### Bolsista de Iniciação Científica
```json
{
  "name": "Maria",
  "age": 21,
  "studentId": "20230124",
  "major": "Biologia",
  "workedDays": 15,
  "scholarshipAmount": 50
}
```

### Estudante de Pós-Graduação
```json
{
  "name": "Carlos",
  "age": 26,
  "studentId": "20230125",
  "thesisTitle": "Estudo sobre IA",
  "supervisor": "Dr. Silva",
  "workedDays": 20,
  "scholarshipAmount": 70
}
```

---

## ❗ Observações

- Certifique-se de estar conectado à internet para acessar a API.
- O cliente trata erros comuns como falhas de conexão e entradas inválidas.
- A API utilizada é pública e pode estar sujeita a limitações de uso.

---

## 📄 Licença

Este projeto é de uso educacional e livre para modificação.