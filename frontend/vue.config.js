const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081, // 修改为除了8080之外的其他端口
    //https:true,
  }
})
