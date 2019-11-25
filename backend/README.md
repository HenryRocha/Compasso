# BACKEND

## ESTRUTUTRA

A estrutura do backend vai seguir a idéia de micro serviços. Todas as API's que forem criadas devem estar dentro da pasta _source_ e conter seus próprios arquivos _package.json_ e _yarn.lock_. Isso possibilita que cada API tenha seus próprios módulos, sem criar conflitos ou dependências de módulos que são usados por outras API's.
A estrutura correta é parecida com algo assim:

```
backend
|   .eslintrc.json
|   package-lock.json
|   package.json
|   yarn.lock
|------ src
|   |------ projectsAPI
|   |   |   index.js
|   |   |   package.json
|   |   |   yarn.lock
|   |------ usersAPI
|   |   |   index.js
|   |   |   package.json
|   |   |   yarn.lock
```

Para criar essa estrutura, basta criar uma nova pasta dentro de _src_, e dentro dela executar ```yarn init```, isso irá gerar todos os arquivos necessários (_package.json_ e _yarn.lock_). Ou seja, basta fazer:

```shell
mkdir algumaAPI
cd algumaAPI
yarn init
```

Feito isso, criar o arquivo _index.js_ e começar o desenvolvimento.

## MÓDULOS

Ao criar ou usar a API pela primeira vez, devemos executar o seguinte comando para instalar todos os módulos e criar a pasta _node_modules_ para a API:

```shell
yarn install
```

Para adicionar módulos, basta entrar na pasta da API e executar:

```shell
yarn add nomeDoModulo
```

## BASE DE DADOS

Durante o desenvolvimento do projeto vamos utilizar da uma base de dados local, visto que não é possível acessar a base de dados na nuvem no prédio 1. Para criar uma base de dados local basta criar uma pasta onde deseja guardar os dados e deixar rodando o seguinte comando:

```shell
mongod --dbpath caminhoDaPasta
```

E para acessar o console dessa base de dados, abrir um novo console e rodar:

```shell
mongo
```

<<<<<<< HEAD
=======
O detalhamento da base de dados por ser encontrado em ```/backend/DATABASE.md``` ou clicando [aqui](DATABASE.md).

>>>>>>> a7c67b0f9385a0e3407b9e849dfb8928779a0574
## STARTING BACKEND

Na pasta inicial (`/backend`), rode o seguinte comando:

```shell
yarn start
```

## DOCS

Na documentação, o valor de BASE_URL é o endereço onde o gateway está rodando.
Caso rode o back inteiro local, BASE_URL = `http://localhost:8080`

### LOGIN API

#### /user

Mock request:

```js
axios.post(BASE_URL + "/user", {
    name: 'Joaquim Silva',
    email: 'joaquim@silva.com',
    password: 'joaquimSilva',
});
```

Mock Response:

```json
{
    "name": "Joaquim Silva",
    "email": "joaquim@silva.com",
    "createdAt": "",
    "_id": ""
}
```

Erros:

```json
{
    "status": 400,
    "message": "Registration Failed"
}
```

```json
{
    "status": 400,
    "message": "User not Found"
}
```

#### /login

Mock Request:

```js
axios.post(BASE_URL + "/login", {
    email: 'joaqui@silva.com',
    password: 'joaquimSilva',
});
```

Erros:

```json
{
    "status": 400,
    "message": "User not Found"
}
```

```json
{
    "status": 400,
    "message": "Invalid Password"
}
```

### IDEAS API

#### /ideas
