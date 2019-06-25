// Inserindo módulos
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');

// Configurações Iniciais
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use((req, res, next) => {
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

// Iniciando Servidor
    app.listen(3000, () => {
        console.log("Servidor rodando!");
    });