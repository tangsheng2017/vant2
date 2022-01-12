module.exports = {
  // 基本路径   整个文件夹在哪
  publicPath: "./",
  // 输出文件目录   文件夹名
  outputDir: "dist",
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。    资源放的目录
  assetsDir: "./static",
  // eslint设置
  lintOnSave: process.env.NODE_ENV === "development",
  devServer: {
    port: process.env.port || process.env.npm_config_port || 3888,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 本地开发时，将 API 请求代理到 API 服务器
    proxy: {
      "/api": {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "" //pathRewrite是使用proxy进行代理时，对请求路径进行重定向以匹配到正确的请求地址
        }
      }
    }
  }
};
