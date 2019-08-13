const ejs = require('ejs')
module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = { url: ctx.path }

  try {
    // renderToString 回调函数中，传入的 context 对象会暴露如下方法
    // https://ssr.vuejs.org/zh/guide/build-config.html#客户端配置-client-config
    const appString = await renderer.renderToString(context)

    const html = ejs.render(template, {
      appString,
      styles: context.renderStyles(),
      scripts: context.renderScripts()
    })

    ctx.body = html
  } catch (error) {
    console.log('render error', error)
    throw error
  }
}
