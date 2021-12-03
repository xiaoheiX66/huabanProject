let mysql = require('mysql')

let bodyParser = require('body-parser')
let jsonParser = bodyParser.urlencoded();

let connects = mysql.createConnection({
    host: "localhost",
    user: "Xn",
    password: "123456",
    database: "DatabaseTest"
})
connects.connect();