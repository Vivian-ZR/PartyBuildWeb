module.exports = {
  baseUrl: '/web/',
  devServer: {
    // 设置代理
    proxy: 'http://47.101.221.57:10087'
  },
  configureWebpack: {
    externals: {
      'BMap': 'BMap'
    }
  }
}