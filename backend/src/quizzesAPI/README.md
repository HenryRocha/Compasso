
# QuizzesAPI

# Setup
### Módulos
Para rodar essa API é necessário primeiramente instalar todos os modulos necessários. Isso pode ser feito executando o seguinte comando dentro de ```Compasso/backend/```:
```bash
yarn
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
### POST
Cria um quiz com as respostas se o _usuário_, _projeto_ e _template_ dados existem.

#### Request
```json
{
    "_userId": "5dd982cd3c8d924895aebf6b",
    "_projectId": "5dd98fcea7e6bd57c9f0d2bb",
    "_templateId": "5dda1ea0a515872369fd9ed1",
    "questions": [
        {
            "question": "Você recomenda esse professor?",
            "choices": [
                "Sim",
                "Não"
            ],
            "answers": [
                "Sim"
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
	"message": "Quiz created successfully"
}
```

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
	"quiz": [
		{
			"questions": [
				{
					"question": "Você recomenda esse professor?",
					"choices": [
						"Sim",
						"Não"
					],
					"answers": [
						"Sim"
					],
					"type": "checkbox",
					"multiple": "false"
				}
			],
			"_id": "5ddace90ebaf6f3f380e0a8b",
			"_userId": "5dd982a23c8d924895aebf69",
			"_projectId": "5dd98fcea7e6bd57c9f0d2bb",
			"_templateId": "5dda1ea0a515872369fd9ed1",
			"answerDate": "2019-11-24T18:40:16.832Z",
			"__v": 0
		}
	]
}
```

## /quizzes/project
Devolve todos os quizzes de um projeto. Só devolve esses quizzes se o usuário dado for um _admin_ ou um _manager_ do projeto dado.
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
			"questions": [
				{
					"question": "Você recomenda esse professor?",
					"choices": [
						"Sim",
						"Não"
					],
					"answers": [
						"Sim"
					],
					"type": "checkbox",
					"multiple": "false"
				}
			],
			"_id": "5ddace90ebaf6f3f380e0a8b",
			"_userId": "5dd982a23c8d924895aebf69",
			"_projectId": "5dd98fcea7e6bd57c9f0d2bb",
			"_templateId": "5dda1ea0a515872369fd9ed1",
			"answerDate": "2019-11-24T18:40:16.832Z",
			"__v": 0
		},
		{
			"questions": [
				{
					"question": "Você recomenda esse professor?",
					"choices": [
						"Sim",
						"Não"
					],
					"answers": [
						"Sim"
					],
					"type": "checkbox",
					"multiple": "false"
				}
			],
			"_id": "5ddace90ebaf6f3f380e0a8b",
			"_userId": "5dd982a23c8d924895aebf69",
			"_projectId": "5dd98fcea7e6bd57c9f0d2bb",
			"_templateId": "5dda1ea0a515872369fd9ed1",
			"answerDate": "2019-11-24T18:40:16.832Z",
			"__v": 0
		}
	]
}
```

## /quizzes/idea
Devolve todos os quizzes relacionados à uma idéia. Só devolve esses quizzes caso o usuário passado seja um _admin_, um _manager_ do projeto relacionado à essa idéia ou caso o usuário seja o autor dessa idéia.

### GET
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
			"questions": [
				{
					"question": "Você recomenda esse professor?",
					"choices": [
						"Sim",
						"Não"
					],
					"answers": [
						"Sim"
					],
					"type": "checkbox",
					"multiple": "false"
				}
			],
			"_id": "5ddace90ebaf6f3f380e0a8b",
			"_userId": "5dd982a23c8d924895aebf69",
			"_projectId": "5dd98fcea7e6bd57c9f0d2bb",
			"_templateId": "5dda1ea0a515872369fd9ed1",
			"answerDate": "2019-11-24T18:40:16.832Z",
			"__v": 0
		},
		{
			"questions": [
				{
					"question": "Você recomenda esse professor?",
					"choices": [
						"Sim",
						"Não"
					],
					"answers": [
						"Sim"
					],
					"type": "checkbox",
					"multiple": "false"
				}
			],
			"_id": "5ddace90ebaf6f3f380e0a8b",
			"_userId": "5dd982a23c8d924895aebf69",
			"_projectId": "5dd98fcea7e6bd57c9f0d2bb",
			"_templateId": "5dda1ea0a515872369fd9ed1",
			"answerDate": "2019-11-24T18:40:16.832Z",
			"__v": 0
		}
	]
}
```
