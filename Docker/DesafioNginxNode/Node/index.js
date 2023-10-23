const express = require('express')
const app = express()

const port = 3000

const config = {
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}


const mysql = require('mysql')
const connection = mysql.createConnection(config)


const table = sqlTable(connection)

function sqlTable(connection) {
  return new Promise((resolve, reject) => {
    const sql = `create table if not exists people (
      id int not null auto_increment,
      name varchar(255) not null,
      primary key (id)
    )`
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

const insert = sqlInsert(connection)

function sqlInsert(connection) {
  return new Promise((resolve, reject) => {
    const sql = `insert into people(name) values ?`
    const peoples = [['Lucian'], ['Luiz'], ['Gabriel'], ['André'], ['Mikeli'], ['Emanueli']]
    connection.query(sql, [peoples], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
        console.log(`Foram inseridas ${result.affectedRows} pessoas!`)
      }
    })
  })
}

insert.then(result => {
  console.log(result)
})

const select = sqlSelect(connection)

function sqlSelect(connection) {
  return new Promise((resolve, reject) => {
    const sql = `select * from people`
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

const listPeople = async () => {
  const allPeople = (await select)
  console.log(allPeople)
  return allPeople
}

app.get('/', async (req, res) => {
  const peoples = await listPeople()
  const listPeoples = '<ul>' + peoples.map(item => `<li align="center">${item.name}</li>`).join('') + '</ul>'
  res.send(`<h1 align="center">Full Cycle Rocks!</h1>\n${listPeoples}`)
})

app.listen(port, () => {
  console.log(`Ouvindo na porta: ${port}`)
})