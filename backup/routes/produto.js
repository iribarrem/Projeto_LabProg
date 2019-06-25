var express = require("express");
var app = express();
var path = require('path');

const mysql = require("mysql");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'app',
    password: '1234',
    database: 'projeto'
});

db.connect();

app.get('/', (req, res) => {
    db.query("SELECT * FROM produtos ", (err, rows) => {
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send(rows);
    });
});

app.post('/', (req, res) => {
    db.query('INSERT INTO produtos(descricao, categoria_id) VALUES ("' + req.body.descricao + '", ' + req.body.categoria_id + ')',
        (err, rows) =>{
            if(err){
                res.status(500).send(err);
                console.log(err);
            }
            else{
                res.status(201).send('');
            }
        });
});

app.get('/adicionar', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../html/adicionar_produto.html'));
});

app.get('/lista', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../html/produtos.html'));
});

module.exports = app;