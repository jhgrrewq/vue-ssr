const Koa = require('koa')
const app = new Koa()
const bodyparser = require('koa-bodyparser')
const apiRouter = require('./router/api')

// 解析post数据并注册路由
app.use(bodyparser())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())
app.listen(3000, () => console.log('api服务已启动'))
