const Koa = require('koa')
const app = new Koa()
const bodyparser = require('koa-body')
const apiRouter = require('./router/api')
const staticRouter = require('./router/static')

const isDev = process.env.NODE_ENV === 'development'

// 错误中间件
app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (error) {
    console.log(error)
    ctx.status = 500
    if (isDev) {
      ctx.body = error.message
    } else {
      ctx.body = 'please try again later!'
    }
  }
})

// 解析post数据并注册路由
app.use(bodyparser())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

const pageRouter = isDev ? require('./router/dev-ssr') : require('./router/ssr')
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

app.listen(3000, () => console.log('api服务已启动'))
