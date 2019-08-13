import createApp from './create-app'

// 这里 context 也就是服务端渲染 renderToString 传入 context
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()

    // 服务端主动调用
    router.push(context.url)

    // 路由记录被推进去后，所有异步操作完成（如加载异步组件）
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) {
        return reject(new Error(`no component matched`))
      }

      resolve(app)
    })
  })
}
