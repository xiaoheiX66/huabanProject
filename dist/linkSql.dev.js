"use strict";

var mysql = require('mysql');

var bodyParser = require('body-parser');

var jsonParser = bodyParser.urlencoded();
var connects = mysql.createConnection({
  host: "localhost",
  user: "Xn",
  password: "123456",
  database: "DatabaseTest"
});
connects.connect();