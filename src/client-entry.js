import createApp from './create-app'

const {
  app
} = createApp()

// 服务端渲染好的应用 根元素 添加了一个特殊的属性 <div id="app" data-server-rendered="true">，这让客户端 vue 知道这部分 html 是 Vue 在服务端渲染的，需要用激活模式挂载

// app.$mount('#root') 激活客户端脚本
// 对于没有 data-server-rendered 属性的元素上，还可以向 $mount 函数的 hydrating 参数位置传入 true，来强制使用激活模式
// app.$mount('#root', true)
app.$mount('#root')
