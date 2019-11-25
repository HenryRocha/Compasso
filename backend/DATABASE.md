# Database

A base de dados do projeto será dividida em **5** _collections_: **users**, **projects**, **ideas**, **templates** e **quizzes**.

## Users
A _collection_ de **users** é responsável por guardar todos os usuários. O atributo *_projectId* é obtido quando um usuário tenta se cadastrar no app usando o _token_ de sua empresa. A usersAPI tem que verificar se esse token existe na _collection_ de **projetos** e então associar esse novo usuário àquele projeto (através do *_id* do projeto que usa esse _token_). O atributo _manager_ indica se esse usuário é gerente do projeto que ele está relacionado. O objeto que representa cada usuário é o seguinte:
```json
{
  "_id": "ObjectId('5dc83519570f662ac81a59b7')",
  "_projectId": "ObjectId('5dc83519570f662ac81a59b5')",
  "name": "Henry Rocha",
  "email": "henrer@henrer.com",
  "salt": "tempero",
  "hash": "bemTemperado",
  "admin": "false",
  "manager": "false"
}
```

## Projects
A _collection_ de **projects** é responsável por guardar todos os projetos em andamento. O atributo _email_ desse objeto é o email do responsável ou gerente da empresa associada à esse projeto. O atributo _quizzes_ é uma lista de todos os quizzes desse projeto e seus respectivos templates, nomes e deadlines. O objeto que representa cada projeto é o seguinte:
```json
{
  "_id": "ObjectId('5dc83519570f662ac81a59b5')",
  "title": "Projeto da Tesla",
  "description": "CyberTruck",
  "email": "elon@musk.com",
  "token": "1234",
  "quizzes": [
    {
      "_templateId": "ObjectId('5dc83519570f662ac81a59b4')",
      "deadline": "2019-12-31T03:00:00.000+00:00",
      "name": "D0"
    },
    {
      "_templateId": "ObjectId('5dc83519570f662ac81a59b6')",
      "deadline": "2019-12-31T03:00:00.000+00:00",
      "name": "D7"
    }
  ]
}
```

## Ideas
A _collection_ de **ideas** é responsável por guardar todas as idéias existentes. Esse objeto contém as informações de cada idéia cadastrada. O atributo _quizzes_ contém a lista de quizzes que essa idéia deverá responder. Cada item dentro de _quizzes_ especifica qual será o template usado, se ele foi respondido, quando foi respondido, até quando pode ser respondido e o _id_ do quiz correspondente (Caso já tenha sido respondido, senão será _null_, assim como _answerDate_). O objeto que representa cada ideia é o seguinte:
```json
{
  "_id": "ObjectId('5dc83519570f662ac81a59b4')",
  "_userId": "ObjectId('5dc83519570f662ac81a59b4')",
  "_projectId": "ObjectId('5dc83519570f662ac81a59b4')",
  "quizzes": [
    "ObjectId('5dc83519570f662ac81a59b4')",
    "ObjectId('5dc83519570f662ac81a59b4')"
  ]
}
```

## Templates
A _collection_ de **templates** é responsável por guardar todos os templates existentes. O atributo _questions_ é um _array_ de _JSON's_, sendo cada _JSON_ uma pergunta. Cada pergunta tem seu tipo, que pode ser discursiva ou de múltipla escolha, sendo assim devemos indicar isso, além da possíveis respostas. O objeto que representa cada template é o seguinte:
```json
{
  "_id": "ObjectId('5dc83519570f662ac81a59b4')",
  "title": "Avaliação de Professores",
  "description": "Cadê o canetão?",
  "questions": [
    {
      "question": "Você recomenda esse professor?",
      "choices": [
        "Sim",
        "Não"
      ],
      "answers": [],
      "type": "checkbox",
      "multiple": "false"
    }
  ]
}
```

## Quizzes
A _collection_ de **quizzes** é responsável por guardar todos os quizzes já respondidos, incluindo o D0. Os atributos _answerDate_ e _deadline_ indicam quando esse quiz foi respondido e qual era a data limite para respondê-lo. Para mais informações sobre o atributo _questions_, ler a parte de **templates**. O objeto que representa cada quizz é o seguinte:
```json
{
  "_id": "ObjectId('5dc83519570f662ac81a59b4')",
  "_userId": "ObjectId('5dc83519570f662ac81a59b4')",
  "_projectId": "ObjectId('5dc83519570f662ac81a59b4')",
  "_templateId": "ObjectId('5dc83519570f662ac81a59b4')",
  "answerDate": "2019-11-25T03:00:00.000+00:00",
  "deadline": "2019-12-31T03:00:00.000+00:00",
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
