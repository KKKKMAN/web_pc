const { defineConfig } = require("@vue/cli-service");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
});
module.exports = {
  configureWebpack: (config) => {
    config.optimization = {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    };
  },
};
module.exports = {
  assetsDir: "static",
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  lintOnSave: false, //关闭eslint
  devServer: {
    port: 3000,
    open: true,
    hot: true, //自动保存
    proxy: {
      "/api": {
        target: "http://ylapi.yitaoshouyin.com:8089", //访问接口数据
        // target: "https://yl.yitaoshouyin.com",
        ws: false, // ------------------------- 代理 websockets
        changeOrigin: true,
        pathRewrite: {
          //  ------------------- 重写
          "^/api": "/",
        },
      },
    },
  },
};
