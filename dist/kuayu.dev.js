"use strict";

var _require = require("http-proxy-middleware"),
    createProxyMiddleware = _require.createProxyMiddleware;

app.use('/api', createProxyMiddleware({
  target: "https://muse.huaban.com/",
  changeOrigin: true,
  pathRewrite: {
    "^/api": "/"
  }
}));