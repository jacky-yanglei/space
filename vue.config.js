module.exports = {
  publicPath: '/tsmfront',
  assetsDir: 'static',
  outputDir: 'dist',
  // build: {
  //   assetsPublicPath: '/tsmfront/'
  // },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 200000 }))
  },
  devServer: {
    port: 8002,
    disableHostCheck: true,
    proxy: {
        '/tsm/api/': {     //这里最好有一个 /
            target: 'https://wx.tmgxbxwl.cn/',  // 后台接口域名
            // target: 'http://192.168.100.202:8000/',  // 后台接口域名
            // target: 'http://confusion.imwork.net:24643/',  // 后台接口域名
            ws: true,        //如果要代理 websockets，配置这个参数
            secure: true,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,  // 是否跨域
            // pathRewrite: { '^/tsm/api/': '/' },
        }
        // https://wx.tmgxbxwl.cn/tsm/api/xxx/xxx.video
    }
  }
}