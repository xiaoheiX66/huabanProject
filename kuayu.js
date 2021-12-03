let {createProxyMiddleware} = require("http-proxy-middleware")


app.use(
    '/api',
    createProxyMiddleware({
        target: "https://muse.huaban.com/",
        changeOrigin: true,
        pathRewrite: {
            "^/api": "/",
        },
    })
);
