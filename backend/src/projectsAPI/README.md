# ProjectsAPI
# Setup
### Módulos
Para rodar essa API é necessário primeiramente instalar todos os modulos necessários. Isso pode ser feito executando o seguinte comando dentro de ```Compasso/backend/```:
```bash
yarn install --force
```

### .env
Em seguida devemos criar o arquivo **.env** dentro de ```Compasso/backend/src/projectsAPI/```, esse arquivo deve conter as seguintes variáveis:
```
PORT = portNumber
DDBURL = databaseURL
```

### Database
Para que essa API funcione é nessessário que o Mongo esteja rodando e nela tenha a base de dados _Compasso_.

### Rodando
Para rodar basta executar:

```bash
yarn start
```
Ou, caso queira rodar no modo desenvolvedor:
```bash
yarnd dev
```

# Routes

## /projects

### POST
Cria um Projeto se o _projeto_ não existe. Na criação desse projeto deve ser atribuído as informações sobre cada quiz atrelado a ele.
#### Request
```json
{
  "title": "Projeto",
  "description": "Alguma descrição",
  "email": "projeto@teste.com",
  "quizzes": [{"_templateId": "ObjectId('5dc83519570f662ac81a59b4')",
      "deadline": "2019-12-31T03:00:00.000+00:00",
      "name": "D0"}]
}
```
#### Response
```json
{
  "title": "Projeto",
  "description": "Alguma descrição",
  "email": "projeto@teste.com",
  "token": "4009",
  "quizzes": [{"_templateId": "ObjectId('5dc83519570f662ac81a59b4')",
      "deadline": "2019-12-31T03:00:00.000+00:00",
      "name": "D0"}]
}
```

### GET
Devolve todos projetos existentes se o usuário dado é um _admin_.
#### Request
```json
{
    "userId": "5dd982a23c8d924895aebf69"
}
```
#### Response
```json
[{
  "title": "Projeto",
  "description": "Alguma descrição",
  "email": "projeto@teste.com",
  "token": "4009",
  "quizzes": [{"_templateId": "ObjectId('5dc83519570f662ac81a59b4')",
      "deadline": "2019-12-31T03:00:00.000+00:00",
      "name": "D0"}]
},

{
  "title": "Projeto2",
  "description": "Alguma descrição",
  "email": "projeto2@teste.com",
  "token": "5005",
  "quizzes": [{"_templateId": "ObjectId('5dc83519570f762ac81a59b4')",
      "deadline": "2019-12-31T03:00:00.000+00:00",
      "name": "D1"}]
}]
```

## /project

### GET
Devolve um projeto específico selecionado se o usuário dado é um _admin_ ou _manager_ deste projeto.
#### Request
```json
{
    "userId": "5dd982a23c8d924895aebf69",
    "projectId": "5ddace90ebaf6f3f380e0a8b"
}
```
#### Response
```json
{
  "title": "Projeto",
  "description": "Alguma descrição",
  "email": "projeto@teste.com",
  "token": "4009",
  "quizzes": [{"_templateId": "ObjectId('5dc83519570f662ac81a59b4')",
      "deadline": "2019-12-31T03:00:00.000+00:00",
      "name": "D0"}]
}
```

