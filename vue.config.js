const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port:6888,
    host:"localhost",
    open:true,
    https:false
  }
})
