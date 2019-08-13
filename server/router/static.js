const Router = require('koa-router')
const send = require('koa-send') // 静态资源处理中间件

// 只会处理 /dist 开头的静态资源
const router = new Router({
  prefix: '/dist'
})

router.get('*', async (ctx) => {
  await send(ctx, ctx.path)
})

module.exports = router
