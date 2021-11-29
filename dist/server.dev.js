"use strict";

var express = require('express');

var mysql = require('mysql'); // let {
//     createProxyMiddleware
// } = require('http-proxy-middleware')


var bodyParser = require('body-parser');

var jsonParser = bodyParser.urlencoded();
var connects = mysql.createConnection({
  host: "localhost",
  user: "Xn",
  password: "123456",
  database: "DatabaseTest"
});
connects.connect();
var app = express();
app.use(express["static"]('./')); // app.use(
//     '/api',
//     createProxyMiddleware({
//         target: "https://muse.huaban.com/",
//         changeOrigin: true,
//         pathRewrite: {
//             "^/api": "/",
//         },
//     })
// );
// submit

app.get("/sub", function (req, res) {
  var _req$query = req.query,
      username = _req$query.username,
      password = _req$query.password;
  connects.query("select * from user where username='".concat(username, "' and password='").concat(password, "'"), function (err, data) {
    if (err) {
      res.send({
        code: false,
        msg: req.query,
        status: 400
      });
      console.log('登陆失败');
    }

    res.send({
      code: true,
      msg: req.query,
      status: 200
    });
    console.log('登陆成功'); // if (data[0]) {
    //     res.send({
    //         code: true,
    //         msg: req.query,
    //         status: 200
    //     })
    //     console.log('登陆成功');
    // }else{
    //      res.send({
    //         code: false,
    //         msg: req.query,
    //         status: 400
    //     })
    //     console.log('登陆失败');
    // }
  });
}); // register

app.post("/reg", jsonParser, function (req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;
  connects.query("insert into user values(".concat(null, ",'", username, "','").concat(password, "')"), function (err, data) {
    if (err) {
      res.send({
        code: false,
        msg: "注册失败",
        status: 400
      });
      console.log('req.body', req.body);
    }

    res.send({
      code: true,
      msg: "注册成功",
      status: 200
    });
    console.log('req.body', req.body);
  });
});
app.listen(8088, function () {
  console.log('8088 is listning....');
});