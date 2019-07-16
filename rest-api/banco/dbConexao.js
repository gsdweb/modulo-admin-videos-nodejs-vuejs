const mysql = require('mysql');

let conexao = mysql.createPool({
    host: 'localhost',
    user : 'root',
    password : '',
    database : 'bdvideos'
});

module.exports = conexao;

