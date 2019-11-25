# IdeasAPI

# Setup

### Módulos

Para rodar essa API é necessário primeiramente instalar todos os modulos necessários. Isso pode ser feito executando o seguinte comando dentro de `Compasso/backend/`:

```bash
yarn
```

### .env

Em seguida devemos criar o arquivo **.env** dentro de `Compasso/backend/src/quizzesAPI/`, esse arquivo deve conter as seguintes variáveis:

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

Cria uma idéia se o _usuário_, _projeto_ e _template_ dados existem. Essa idéia só pode ser criada se for passado o quiz D0 junto.

#### Request

```json
{
    "_userId": "5dd982a23c8d924895aebf69",
    "_projectId": "5dd98fcea7e6bd57c9f0d2bb",
    "quizzes": [
        {
            "_templateId": "5dda1ea0a515872369fd9ed1",
            "_quizId": "5ddace90ebaf6f3f380e0a8b",
            "answered": "true",
            "deadline": "2019-12-31T00:00:00Z",
            "name": "D0"
        }
    ]
}
```

#### Response

```json
{
    "ok": false,
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
    "idea": [
        {
            "quizzes": [
                {
                    "_quizId": "5ddace90ebaf6f3f380e0a8b",
                    "answered": true,
                    "_id": "5ddb51724f3aef152c14eccb",
                    "_templateId": "5dda1ea0a515872369fd9ed1",
                    "deadline": "2019-12-31T00:00:00.000Z",
                    "name": "D0"
                },
                {
                    "_quizId": null,
                    "answered": false,
                    "_id": "5ddb51724f3aef152c14eccc",
                    "_templateId": "5dda1ea0a515872369fd9ed1",
                    "deadline": "2019-12-31T03:00:00.000Z",
                    "name": "D7"
                }
            ],
            "_id": "5ddb51724f3aef152c14eccd",
            "_userId": "5dd982a23c8d924895aebf69",
            "_projectId": "5dd98fcea7e6bd57c9f0d2bb",
            "__v": 0
        }
    ]
}
```

## /ideas

### GET

Devolve todas as idéias caso o usuário seja um _admin_. Se o usuário dado é _manager_, devolve todas a idéias relacionadas ao projeto desse _manager_. Caso não seja nenhum dos dois, devolve todas as idéias relacionadas ao usuário dado.

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
    "idea": [
        {
            "quizzes": [
                {
                    "_quizId": "5ddace90ebaf6f3f380e0a8b",
                    "answered": true,
                    "_id": "5ddb51724f3aef152c14eccb",
                    "_templateId": "5dda1ea0a515872369fd9ed1",
                    "deadline": "2019-12-31T00:00:00.000Z",
                    "name": "D0"
                },
                {
                    "_quizId": null,
                    "answered": false,
                    "_id": "5ddb51724f3aef152c14eccc",
                    "_templateId": "5dda1ea0a515872369fd9ed1",
                    "deadline": "2019-12-31T03:00:00.000Z",
                    "name": "D7"
                }
            ],
            "_id": "5ddb51724f3aef152c14eccd",
            "_userId": "5dd982a23c8d924895aebf69",
            "_projectId": "5dd98fcea7e6bd57c9f0d2bb",
            "__v": 0
        }
    ]
}
```
