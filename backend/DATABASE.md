# Database

A base de dados do projeto será dividida em **5** _collections_: **users**, **projects**, **ideas**, **templates** e **quizzes**.

## Users
A _collection_ de **users** é responsável por guardar todos os usuários. O atributo *_projectId* é obtido quando um usuário tenta se cadastrar no app usando o _token_ de sua empresa. A usersAPI tem que verificar se esse token existe na _collection_ de **projetos** e então associar esse novo usuário àquele projeto (através do *_id* do projeto que usa esse _token_). O objeto que representa cada usuário é o seguinte:
```json
{
	_id: ObjectId("5dc83519570f662ac81a59b7"),
	_projectId: ObjectId("5dc83519570f662ac81a59b5"),
	name: "Henry Rocha",
	email: "henrer@henrer.com",
	salt: "tempero",
	hash: "bemTemperado",
	admin: false
}
```

## Projects
A _collection_ de **projects** é responsável por guardar todos os projetos em andamento. O atributo _email_ desse objeto é o email do responsável ou gerente da empresa associada à esse projeto. O objeto que representa cada projeto é o seguinte:
```json
{
	_id: ObjectId("5dc83519570f662ac81a59b5"),
	title: "Vitor Eller",
	description: "",
	email: "vitor@cleber.com",
	token: 1234
}
```

## Ideas
A _collection_ de **ideas** é responsável por guardar todas as idéias existentes. Esse objeto contém as informações de cada idéia cadastrada. O atributo _quizzes_ contém a lista de quizzes que essa idéia deverá responder. Cada item dentro de _quizzes_ especifica qual será o template usado, se ele foi respondido, quando foi respondido, até quando pode ser respondido e o _id_ do quiz correspondente (Caso já tenha sido respondido, senão será _null_, assim como _answerDate_). O objeto que representa cada ideia é o seguinte:
```json
{
	_id: ObjectId("5dc83519570f662ac81a59a7"),
	_userId: ObjectId("5dc83519570f662ac81a59b7")
	_projectId: ObjectId("5dc83519570f662ac81a59b5"),
	quizzes: [
		{
			_templateId: ObjectId("5dc83519570f662ac81a59c7"),
			_quizzId: ObjectId("5dc83519570f662ac81a59cd7"),
			answered: false,
			answerDate: ISODate("2012-10-15T21:26:17Z"),
			deadline: ISODate("2013-10-15T21:26:17Z"),
		}
	]
}
```

## Templates
A _collection_ de **templates** é responsável por guardar todos os templates existentes. O atributo _questions_ é um _array_ de _JSON's_, sendo cada _JSON_ uma pergunta. Cada pergunta tem seu tipo, que pode ser discursiva ou de múltipla escolha, sendo assim devemos indicar isso, além da possíveis respostas. O objeto que representa cada template é o seguinte:
```json
{
	_id: ObjectId("5dc83519570f662ac81a59c7"),
	title: "Avaliação de Professores",
	description: "Cadê o canetão?"
	questions: [
		{
			question: "Você recomenda esse professosr?",
			choices: ["Sim", "Não"],
			answers: ["Não"],
			type: "discursive|checkbox"
		}
	]
}
```

## Quizzes
A _collection_ de **quizzes** é responsável por guardar todos os quizzes já respondidos, incluindo o D0. Os atributos _answerDate_ e _deadline_ indicam quando esse quiz foi respondido e qual era a data limite para respondê-lo. Para mais informações sobre o atributo _questions_, ler a parte de **templates**. O objeto que representa cada quizz é o seguinte:
```json
{
	_id: ObjectId("5dc83519570f662ac81a59d7"),
	_userId: ObjectId("5dc83519570f662ac81a59b7")
	_projectId: ObjectId("5dc83519570f662ac81a59b5"),
	_templateId: ObjectId("5dc83519570f662ac81a59c7"),
	answerDate: ISODate("2012-10-15T21:26:17Z"),
	deadline: ISODate("2013-10-15T21:26:17Z"),
	questions: [
		{
			question: "Qual o sentido da vida?",
			choices: ["a", "b", "c", "d"],
			answers: ["Usar drogas"],
			type: "discursive|checkbox"
		}
	]
}
```
