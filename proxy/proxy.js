const express = require('express')
const {createProxyMiddleware} = require('http-proxy-middleware')
const app = express()


app.use('/api', createProxyMiddleware({target: 'https://dev.namisushi.dn.ua', changeOrigin: true}))
app.use('/', createProxyMiddleware({target: 'http://localhost:8080', changeOrigin: true}))



app.listen(8080, () => void console.log('start'))