const express = require('express')
const app = express()
const port = 3306
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
const connect = mysql.createConnection(config)

connect.query(
    `CREATE TABLE IF NOT EXISTS people (
         id INT(11) NOT NULL AUTO_INCREMENT,
         name VARCHAR(255) NOT NULL,
         PRIMARY KEY (id)
     )`
 )

connect.query(
     `INSERT INTO people 
     (
         name
     ) 
     VALUES 
     ('André'), 
     ('Mikeli'), 
     ('Emanueli')
 `)

app.get('/', (req,res) => {

    connect.query(
        'SELECT * FROM people', 
        (error, results) => {
            if (error) throw error;

            console.log(results);
            
            let table = '<table>';
            table += '<tr><th>ID</th><th>Nome</th></tr>';

            results.forEach((result) => {
                table += '<tr><td>' + result.id + '</td><td>' + result.name + '</td></tr>';
            });
            table += '</table>';

            res.send(
                    '<h1>Full Cycle Rocks!!!</h1>' +
                    '<br><b>Lista da tabela People: </b>' + 
                    table
                );
        });
})

connect.end()

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})