# IdeasAPI
# Setup
### Módulos
Para rodar essa API é necessário primeiramente instalar todos os modulos necessários. Isso pode ser feito executando o seguinte comando dentro de ```Compasso/backend/```:
```bash
yarn install --force
```

### .env
Em seguida devemos criar o arquivo **.env** dentro de ```Compasso/backend/src/quizzesAPI/```, esse arquivo deve conter as seguintes variáveis:
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

## /idea

### POST
Cria uma idéia se o _usuário_, _projeto_ e dados existem. Ao criar essa idéia, todos os quizzes relacionados à essa idéia são criados também, de acordo com os quizzes especificados no projeto relacionado a essa idéia. Sendo assim, ainda é preciso que o usuário preencha o quiz D0 e depois faça um patch no quiz correspondente.
#### Request
```json
{
  "_userId": "5ddc0c9bb93e4a07ae867733",
  "_projectId": "5ddc07a1b93e4a07ae867732",
  "title": "Idéia do Henry",
  "description": "Alguma descrição"
}
```
#### Response
```json
{
  "ok": true,
  "message": "Idea created successfully"
}
```

### GET
Devolve uma idéia se o usuário dado é um _admin_, _manager_ do projeto relacionado à idéia ou se ele é autor da idéia.
#### Request
```json
{
    "userId": "5dd982a23c8d924895aebf69",
    "ideaId": "5ddace90ebaf6f3f380e0a8b"
}
```
#### Response
```json
{
  "ok": true,
  "idea": {
    "quizzes": [
      "5ddc1dfcc160a57a754d4487",
      "5ddc1dfcc160a57a754d4489"
    ],
    "_id": "5ddc1dfcc160a57a754d448b",
    "_userId": "5ddc0c9bb93e4a07ae867733",
    "_projectId": "5ddc07a1b93e4a07ae867732",
    "title": "Idéia do Henry",
    "description": "Alguma descrição",
    "__v": 0
  }
}
```

## /project/ideas

### GET
Devolve todas as idéias relacionadas a um projeto. Essa request só pode ser feita por _admin_ ou por um _manager_ do projeto dado.
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
  "ok": true,
  "ideas": [
    {
      "quizzes": [
        "5ddc1dfcc160a57a754d4487",
        "5ddc1dfcc160a57a754d4489"
      ],
      "_id": "5ddc1dfcc160a57a754d448b",
      "_userId": "5ddc0c9bb93e4a07ae867733",
      "_projectId": "5ddc07a1b93e4a07ae867732",
      "title": "Idéia do Henry",
      "description": "Alguma descrição",
      "__v": 0
    }
  ]
}
```

## /user/ideas

### GET
Devolve todas as idéias relacionadas a um usuário.
#### Request
```json
{
  "userId": "5dd982a23c8d924895aebf69"
}
```
#### Response
```json
{
  "ok": true,
  "ideas": [
    {
      "quizzes": [
        "5ddc1dfcc160a57a754d4487",
        "5ddc1dfcc160a57a754d4489"
      ],
      "_id": "5ddc1dfcc160a57a754d448b",
      "_userId": "5ddc0c9bb93e4a07ae867733",
      "_projectId": "5ddc07a1b93e4a07ae867732",
      "title": "Idéia do Henry",
      "description": "Alguma descrição",
      "__v": 0
    }
  ]
}
```
