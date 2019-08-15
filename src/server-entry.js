import createApp from './create-app'

// 这里 context 也就是服务端渲染 renderToString 传入 context
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    // 服务端主动调用
    router.push(context.url)

    // 路由记录被推进去后，所有异步操作完成（如加载异步组件）
    router.onReady(() => {
      // 服务端数据预存取
      // 由 router.getMatchedComponents() 相匹配的组件，如果组件暴露出 asyncData，就调用这个方法。然后需要将解析完成的状态，附加到渲染上下文(render context)中
      const matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) {
        return reject(new Error(`no component matched`))
      }

      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state

        resolve(app)
      }).catch(reject)
    })
  })
}
