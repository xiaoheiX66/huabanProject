let express = require('express')
let {createProxyMiddleware} = require('http-proxy-middleware')
let app = express();

app.use(express.static('./'));

app.use(
    '/api',
    createProxyMiddleware({
        target:"https://muse.huaban.com/",
        changeOrigin:true,
        pathRewrite:{
            "^/api":"/",
        },
    })
);


app.listen(8082,()=>{
    console.log('8082 is listning....');
})