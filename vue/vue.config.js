const path = require('path')
const Timestamp = new Date().getTime()
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
    // 相对路径的 publicPath 有一些使用上的限制。在以下情况下，应当避免使用相对 publicPath:
    // 1.当使用基于 HTML5 history.pushState 的路由时；
    // 2.当使用 pages 选项构建多页面应用时。
    publicPath: process.env.VUE_APP_URL_BASE,
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: 'static',
    lintOnSave: true,
    configureWebpack: {
        devtool: 'source-map',
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
        output: {
            // 输出重构  打包编译后的 文件名称  【模块名称.版本号.】
            filename: `static/js/[name].${process.env.VUE_APP_VERSION}.${Timestamp}.js`,
            chunkFilename: `static/js/[name].${process.env.VUE_APP_VERSION}.${Timestamp}.js`,
        },
    },
    // pluginOptions: {
    //     'style-resources-loader': {
    //         preProcessor: 'less',
    //         patterns: [path.resolve(__dirname, './src/assets/less/main.less')],
    //     },
    // },
    // css: {
    //     extract: {
    //         filename: `static/css/[name].${process.env.VUE_APP_VERSION}.${Timestamp}.css`,
    //         chunkFilename: `static/css/[name].${process.env.VUE_APP_VERSION}.${Timestamp}.css`,
    //     },
    // },
}