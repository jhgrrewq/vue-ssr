const Router = require('koa-router')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const MemoryFS = require('memory-fs') // 几乎等同 fs，扩展了 fs，文件生成在内存中
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('../server-render')

const serverConfig = require('../../build/webpack.config.server')

// 编译 webpack, 通过调用 webpack，传入配置对象，得到一个 complier 对象
// 通过对 compiler 对象 watch 或者 run 调用得到打包的 bundle 文件
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs // 指定 compiler 输出目录

let bundle
// watch 文件改动，文件改动会重新打包生成一个新的 bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err // 打包报错
  stats = stats.toJson() // eslint 报错等
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.log(warn))

  // 读取生成的 bundle
  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8')) // 从内存中读取 bundle 字符串，vue-server-render 需要 json 形式
  console.log('new bundle generated')
})

const handleSSR = async ctx => {
  // 服务刚起时 webpack 第一次打包比较慢，此时 bundle 可能还不存在
  if (!bundle) {
    ctx.body = 'wait a moment!'
    return
  }

  // 获取客户端打包静态文件
  const { data: clientManifest } = await axios.get(
    `http://0.0.0.0:8000/dist/vue-ssr-client-manifest.json`
    // `http://127.0.0.1:8000/vue-ssr-client-manifest.json`
  )

  // 获取模板路径
  const template = fs.readFileSync(
    path.join(__dirname, '../server-template.ejs'), 'utf-8'
  )

  // 声明 renderer
  // 默认情况下直接传入生成的客户端清单和页面模板
  // const renderer = createBundleRenderer(serverBundle, {
  //   template,
  //   clientManifest
  // })
  // 当提供 template 选项时，资源注入是自动执行的，不按照官方规定注入设置 inject: false
  const renderer = VueServerRenderer
    .createBundleRenderer(bundle, {
      // 不按照官方规定注入
      inject: false,
      clientManifest
    })

  // 渲染页面
  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
