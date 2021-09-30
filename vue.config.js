const path = require('path')

module.exports = {
  transpileDependencies: true,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'producttion') {
      config.mode = 'production'
    } else {
      config.mode = 'development'
    }
    Object.assign(config, {
      resolve: {
        extensions: ['.js', '.ts', '.vue'],
        alias: {
          '@': path.resolve(__dirname, './src')
        }
      }
    })
  }
}
