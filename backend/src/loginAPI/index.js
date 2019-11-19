const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', require('./controllers/authController'));
app.use('/projects', require('./controllers/projectController'));

app.listen(5002);
