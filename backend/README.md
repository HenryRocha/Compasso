
## ESTRUTUTRA

A estrutura do backend vai seguir a idéia de micro serviços. Todas as API's que forem criadas devem estar dentro da pasta _source_ e conter seus próprios arquivos _package.json_ e _yarn.lock_. Isso possibilita que cada API tenha seus próprios módulos, sem criar conflitos ou dependências de módulos que são usados por outras API's. 
A estrutura correta é parecida com algo assim:
```
backend
|	.eslintrc.json
|	package-lock.json
|	package.json
|	yarn.lock
|------ src
|	|------ projectsAPI
|	|	|	index.js
|	|	|	package.json
|	|	|	yarn.lock
|	|------ usersAPI
|	|	|	index.js
|	|	|	package.json
|	|	|	yarn.lock
```

Para criar essa estrutura, basta criar uma nova pasta dentro de _src_, e dentro dela executar ```yarn init```, isso irá gerar todos os arquivos necessários (_package.json_ e _yarn.lock_). Ou seja, basta fazer:
```
mkdir algumaAPI
cd algumaAPI
yarn init
```
Feito isso, criar o arquivo _index.js_ e começar o desenvolvimento.

## MÓDULOS

Ao criar ou usar a API pela primeira vez, devemos executar o seguinte comando para instalar todos os módulos e criar a pasta _node_modules_ para a API:
```
yarn install
```
Para adicionar módulos, basta entrar na pasta da API e executar:
```
yarn add nomeDoModulo
```

## BASE DE DADOS

Durante o desenvolvimento do projeto vamos utilizar da uma base de dados local, visto que não é possível acessar a base de dados na nuvem no prédio 1. Para criar uma base de dados local basta criar uma pasta onde deseja guardar os dados e deixar rodando o seguinte comando:
```
mongod --dbpath caminhoDaPasta
```

E para acessar o console dessa base de dados, abrir um novo console e rodar:
```
mongo
```
