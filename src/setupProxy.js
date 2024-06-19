const {createProxyMiddleware} = require("http-proxy-middleware")
module.exports = app =>{
    app.use(
        createProxyMiddleware('/api/users/loggedin',{
            target: 'https://vanytuong.com',
            changeOrigin: true,
        })
        

    )
}