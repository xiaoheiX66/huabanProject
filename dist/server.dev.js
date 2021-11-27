"use strict";

var express = require('express');

var _require = require('http-proxy-middleware'),
    createProxyMiddleware = _require.createProxyMiddleware;

var app = express();
app.use(express["static"]('./'));
app.use('/api', createProxyMiddleware({
  target: "https://muse.huaban.com/",
  changeOrigin: true,
  pathRewrite: {
    "^/api": "/"
  }
}));
app.listen(8082, function () {
  console.log('8082 is listning....');
});