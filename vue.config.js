const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');



module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/j-class/",
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        // Vue CLI is in maintenance mode, and probably won't merge my PR to fix this in their tooling
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      })
    ],
  },
})
