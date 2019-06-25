// Inserindo módulos
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configurações Iniciais
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Rotas
app.get('/', (req, res) =>{
    res.status(200).sendFile(__dirname + '/html/index.html');
});

const produto = require('./routes/produto');
app.use('/produto', produto);

const categoria = require('./routes/categoria');
app.use('/categoria', categoria);

app.listen(3000, function(){
    console.log("Servidor rodando!");
});