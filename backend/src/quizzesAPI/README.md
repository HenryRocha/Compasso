# QuizzesAPI
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
## /quiz
### GET
Devolve um quiz específico. Só será devolvido tal quiz se o usuário passado for um _admin_, um _manager_ do projeto ao qual esse quiz está relacionado ou se o usuário for dono desse quiz.
#### Request
```json
{
  "userId": "5dd982a23c8d924895aebf69",
  "quizId": "5ddace90ebaf6f3f380e0a8b"
}
```
#### Response
```json
{
  "ok": true,
  "quiz": {
    "answerDate": "2019-11-25T02:00:00.000Z",
    "questions": [
      {
        "question": "Você recomenda esse professor?",
        "choices": [
          "Sim",
          "Não"
        ],
        "answers": [
          "Não"
        ],
        "type": "checkbox",
        "multiple": "false"
      }
    ],
    "_id": "5ddc1dfcc160a57a754d4489",
    "_userId": "5ddc0c9bb93e4a07ae867733",
    "_projectId": "5ddc07a1b93e4a07ae867732",
    "deadline": "2019-12-31T02:00:00.000Z",
    "name": "D7"
  }
}
```

### PATCH
Atualiza um quiz já existente. Isso é feito quando um usuário responde um quiz por exemplo.
#### Request
```json
{
  "_id": "5ddc1dfcc160a57a754d4489",
  "_userId": "5ddc0c9bb93e4a07ae867733",
  "_projectId": "5ddc07a1b93e4a07ae867732",
  "answerDate": "2019/11/25",
  "deadline": "2019/12/31",
  "name": "D7",
  "questions": [
    {
      "question": "Você recomenda esse professor?",
      "choices": [
        "Sim",
        "Não"
      ],
      "answers": [
        "Não"
      ],
      "type": "checkbox",
      "multiple": "false"
    }
  ]
}
```
#### Response
```json
{
  "ok": true,
  "message": "Quiz patched successfully"
}
```

## /project/quizzes
Devolve todos os quizzes relacionados a um projeto. Apenas um _admin_ ou um _manager_ desse projeto pode fazer essa request.
### GET
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
  "quizzes": [
    {
      "answerDate": null,
      "questions": [
        {
          "question": "Você recomenda esse professor?",
          "choices": [
            "Sim",
            "Não"
          ],
          "answers": [],
          "type": "checkbox",
          "multiple": false
        }
      ],
      "_id": "5ddc1dfcc160a57a754d4487",
      "_userId": "5ddc0c9bb93e4a07ae867733",
      "_projectId": "5ddc07a1b93e4a07ae867732",
      "deadline": "2019-12-31T03:00:00.000Z",
      "name": "D0",
      "__v": 0
    },
    {
      "answerDate": "2019-11-25T02:00:00.000Z",
      "questions": [
        {
          "question": "Você recomenda esse professor?",
          "choices": [
            "Sim",
            "Não"
          ],
          "answers": [
            "Não"
          ],
          "type": "checkbox",
          "multiple": "false"
        }
      ],
      "_id": "5ddc1dfcc160a57a754d4489",
      "_userId": "5ddc0c9bb93e4a07ae867733",
      "_projectId": "5ddc07a1b93e4a07ae867732",
      "deadline": "2019-12-31T02:00:00.000Z",
      "name": "D7",
      "__v": 0
    }
  ]
}
```

## /idea/quizzes
### GET
Devolve todos os quizzes relacionados a uma idéia. Apenas o dono da idéia, um _admin_ ou um _manager_ do projeto relacionado a idéia pode fazer essa request.
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
  "quizzes": [
    {
      "answerDate": null,
      "questions": [
        {
          "question": "Você recomenda esse professor?",
          "choices": [
            "Sim",
            "Não"
          ],
          "answers": [],
          "type": "checkbox",
          "multiple": false
        }
      ],
      "_id": "5ddc1dfcc160a57a754d4487",
      "_userId": "5ddc0c9bb93e4a07ae867733",
      "_projectId": "5ddc07a1b93e4a07ae867732",
      "deadline": "2019-12-31T03:00:00.000Z",
      "name": "D0",
      "__v": 0
    },
    {
      "answerDate": "2019-11-25T02:00:00.000Z",
      "questions": [
        {
          "question": "Você recomenda esse professor?",
          "choices": [
            "Sim",
            "Não"
          ],
          "answers": [
            "Não"
          ],
          "type": "checkbox",
          "multiple": "false"
        }
      ],
      "_id": "5ddc1dfcc160a57a754d4489",
      "_userId": "5ddc0c9bb93e4a07ae867733",
      "_projectId": "5ddc07a1b93e4a07ae867732",
      "deadline": "2019-12-31T02:00:00.000Z",
      "name": "D7",
      "__v": 0
    }
  ]
}
```
