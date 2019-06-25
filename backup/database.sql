CREATE DATABASE projeto;

USE projeto;

CREATE USER 'app'@'%' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON projeto.* TO 'app'@'%';

CREATE TABLE categorias(
    categoria_id INT AUTO_INCREMENT NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    PRIMARY KEY(categoria_id)
)ENGINE = innodb;

CREATE TABLE produtos(
    produto_id INT AUTO_INCREMENT NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    categoria_id INT NOT NULL,

    PRIMARY KEY(produto_id),
    FOREIGN KEY(categoria_id) REFERENCES categorias(categoria_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)ENGINE = innodb;

