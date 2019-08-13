const Router = require('koa-router')
const router = new Router({ prefix: '/api' })

const goods = [
  { id: 1, text: 'Web全栈架构师', price: 1000 },
  { id: 2, text: 'Python架构师', price: 1000 }
]

router.get('/goods', ctx => {
  ctx.body = {
    ok: 1,
    goods
  }
})

router.get('/detail', ctx => {
  ctx.body = {
    ok: 1,
    data: goods.find(good => good.id === Number(ctx.query.id))
  }
})

router.post('/login', ctx => {
  const user = ctx.request.body
  if (user.username === 'jack' && user.password === '123') {
    // 将token存入cookie
    const token = 'a mock token'
    ctx.cookies.set('token', token)
    ctx.body = { ok: 1, token }
  } else {
    ctx.body = { ok: 0 }
  }
})

module.exports = router
