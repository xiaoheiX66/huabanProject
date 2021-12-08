let express = require('express')
let mysql = require('mysql')
let bodyParser = require('body-parser')
let {createProxyMiddleware} = require('http-proxy-middleware')

let app = express();
let connects = mysql.createConnection({
    host: "localhost",
    user: "Xn",
    password: "123456",
    database: "DatabaseTest"
})
connects.connect();

app.use(express.static('./'));
// submit
app.use(
    '/api',
    createProxyMiddleware({
        target:"https://huaban.com/",
        changeOrigin:true,
        pathRewrite:{
            "^/api":"/",
        },
    })
)

app.get("/login",(req,res)=>{
    let { username,password } = req.query
    connects.query(`SELECT * FROM user WHERE username='${username}' AND password='${password}'`,(err,data)=>{
        // console.log("req.query",req.query);
        // console.log("data[0]==",data);
        if(data[0]){
            res.send({code:true,msg:"登陆成功"})
            console.log("登陆成功");
            return;
        }
        res.send({code:false,msg:"登陆失败"})
        console.log("登陆失败");
    })
})

            // register
let jsonParser = bodyParser.urlencoded();
app.post("/reg", jsonParser, (req, res) => {
                let { username,password} = req.body
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

// app.get("/list",(req,res)=>{
//     connects.query("select * from testtable",(err,data)=>{
//         if(data[0]){
//             res.send({code:200,msg:"请求成功"})
//             console.log("data==",data);
//         }
//         res.send({code:400,msg:"请求失败"})
//     })
// })

 app.listen(8088, () => {
                console.log('8088 is listning....');
            })