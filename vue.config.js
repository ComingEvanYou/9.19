const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 6888,
    host: "localhost",
    open: true,
    https: false,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_SERVICE_URL,
        changeorigin: true,
        pathRewrite: {
          ["^"+process.env.VUE_APP_BASE_API]:""
        }
      },
      [process.env.VUE_APP_BASE_V1]: {
        target: process.env.VUE_APP_SERVICE_URL_V1,
        changeorigin: true,
        pathRewrite: {
          ["^"+process.env.VUE_APP_BASE_V1]:""
        }
      }
    }
  }
})