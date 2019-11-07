## Setup

Devemos primeiro instalar todos os módulos usados por essa API usando:
```
yarn install
```

Além disso é necessário criar um arquivo _.env_ no **mesmo diretório** dessa API e declarar as variáveis PORT e dbURL:

```
dbURL = "urlDoBancoDeDados"
PORT = numeroDaPortaParaRodar
```

## Database

Durante o desenvolvimento do projeto vamos utilizar da uma base de dados local, visto que não é possível acessar a base de dados na nuvem no prédio 1. Para criar uma base de dados local basta criar uma pasta onde deseja guardar os dados e dodar o seguinte comando:
```
mongod --dbpath caminhoDaPasta
```

E para acessar o console dessa base de dados, abrir um novo console e rodar:
```
mongo
```

## Run

Para rodar essa API basta executar:
```
yarn start
```
