process.env.VUE_APP_VERSION = require('./package.json').version
const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.plugin('define').tap(options => {
      options[0]['process.env']['VUE_APP_MODERN_BUILD'] =
        process.env.VUE_CLI_MODERN_BUILD
      return options
    })
    config.resolve.alias.set('@', path.resolve(__dirname, 'src/'))
    config.resolve.alias.set('assets', path.resolve(__dirname, 'src/assets'))
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        return options
      })
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|ico)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        name: path.join('../src/assets/', 'img/[name].[ext]')
      })
  },
  publicPath: process.env.NODE_ENV === 'production'
  ? '/vue-note/'
  : '/',
  productionSourceMap: true,
  assetsDir: './assets'
}
