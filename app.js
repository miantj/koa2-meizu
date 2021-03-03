const Koa = require('koa');
const path = require('path')

// const portfinder = require("portfinder")
const views = require('koa-views')
const static = require('koa-static')
const koaBody = require('koa-body');
const models = require('./models')

// 创建一个Koa对象表示web app本身:
const app = new Koa();



app
    .use(views('views'), {
        map: {
            html: 'nunjucks'
        }
    })
    .use(koaBody({
        multipart: true,
        strict: false, //设为false
        formidable: {
            maxFileSize: 200 * 1024 * 1024
        }
    }))
    .use(static(path.join(__dirname, 'public')))


models(app)
let port = 8080
// 设置插件的初始搜寻端口号
// portfinder.getPort((err, port) => {
//     if (err) reject(err)
//     else {
//         // 监听端口:
        app.listen(port);
        console.log(`app started at port 127.0.0.1:${port}`);
//     }
// })