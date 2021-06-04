const path = require('path');

// const tinyPngWebpackPlugin = require('tinypng-webpack-plugin');

module.exports = {
    outputDir: path.resolve(__dirname, '../web'),
    indexPath: '../views/site/index.php', //相对于outputDir
    assetsDir: '',
    //基本路径
    publicPath: '',
    //生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    //存储时不需要eslint
    lintOnSave: false,
    //打包后文件是否添加hash
    filenameHashing: false,
    //css
    css: {
        sourceMap: true
    },
    //webpack配置
    configureWebpack: {
        plugins: [],
        optimization: {
            minimizer: [
                //png压缩
                // new tinyPngWebpackPlugin({
                //   key:"ZcMYDkPWg7eKMpwk78BxcuoFo9JypWNv",
                //   ext: ['png', 'jpeg', 'jpg']
                // })
            ]
        },
        //不加入打包的插件
        externals: {},
        devServer: {
            // Paths
            contentBase: path.resolve(__dirname, '../web'), // /web/
            proxy: {
                '/': {
                    target: process.env.PROXY_TARGET,
                    ws: false,
                    changeOrigin: true,
                    logLevel: "debug"
                }
            },
            // Various Dev Server settings
            host: '0.0.0.0', // can be overwritten by process.env.HOST
            port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        },
    }
};