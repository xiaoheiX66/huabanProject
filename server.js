let express = require('express')
let mysql = require('mysql')
// let {
//     createProxyMiddleware
// } = require('http-proxy-middleware')
let bodyParser = require('body-parser')
let jsonParser = bodyParser.urlencoded();

let connects = mysql.createConnection({
    host: "localhost",
    user: "Xn",
    password: "123456",
    database: "DatabaseTest"
})
connects.connect();
let app = express();

app.use(express.static('./'));

// app.use(
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
app.get("/sub", (req, res) => {
            let {
                username,
                password
            } = req.query;
            connects.query(`select * from user where username='${username}' and password='${password}'`, (err, data) => {
                    if(err){
                        res.send({code:false,msg:req.query,status:400})
                    console.log('登陆失败');
                    }
                        res.send({code:true,msg:req.query,status:200})
                        console.log('登陆成功');
                
                // if (data[0]) {
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
               
            })
             
            })
            // register
app.post("/reg", jsonParser, (req, res) => {
                let {
                    username,
                    password
                } = req.body
                connects.query(`insert into user values(${null},'${username}','${password}')`, (err, data) => {
                    if (err) {
                        res.send({
                            code: false,
                            msg: "注册失败",
                            status: 400
                        })
                        console.log('req.body', req.body);
                    }
                    res.send({
                        code: true,
                        msg: "注册成功",
                        status: 200
                    })
                    console.log('req.body', req.body);

                })
            })

 app.listen(8088, () => {
                console.log('8088 is listning....');
            })