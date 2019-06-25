// Inserindo módulos
    const express = require("express");
    const app = express();
    const path = require('path');
    const mysql = require("mysql");

// Abrindo conexão com o banco de dados
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'app',
        password: '1234',
        database: 'projeto'
    });
    db.connect();

// Desatilitando resposta com Status 304
// Evita que cache do navegador seja utilizado
app.disable('etag');

// Rotas
    app.get('/adicionar', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '../html/adicionar_categoria.html'));
    });

    app.get('/lista', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '../html/categorias.html'));
    });

    app.get('/', (req, res) => {
        db.query("SELECT * FROM categorias ", (err, rows) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).send(rows);
        });
    });

    app.get('/:categoria_id', (req, res) => {
        db.query('SELECT * FROM categorias WHERE categoria_id=' + parseInt(req.params.categoria_id),
        (err, row) => {
            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(200).send(row);
            }
        });
    });

    app.post('/', (req, res) => {
        db.query('INSERT INTO categorias(descricao) VALUES ("' + req.body.descricao + '")',
            (err, rows) =>{
                if(err){
                    res.status(500).send(err);
                }
                else{
                    res.status(201).send('');
                }
            });
    });

    app.put('/:categoria_id', (req, res) => {
        db.query('UPDATE categorias SET descricao="' + req.body.descricao + '" WHERE categoria_id=' + req.params.categoria_id,
            (err, rows) => {
                if(err){
                    res.status(500).send(err);
                }
                else{
                    res.status(201).send('');
                }
            });
    });

    app.delete('/:categoria_id', (req, res) => {
        db.query('DELETE FROM categorias WHERE categoria_id=' + parseInt(req.params.categoria_id),
        (err, rows) => {
            if(err){
                res.status(500).send(err);
                console.log(err);
            }
            else{
                res.status(200).send('');
            }
        });
    });

module.exports = app;