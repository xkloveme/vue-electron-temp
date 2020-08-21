const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  assetsDir: 'assets',
  outputDir: 'dist',
  chainWebpack: config => {
    // 路径别名，如用“@”指代“src”等
    // Path alias, such as "@" for "src", etc.
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('static', resolve('src/assets'))
      .set('views', resolve('src/views'))
      .set('svg', resolve('src/assets/svg'))
      .set('components', resolve('src/components'))
    // svg config
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('svg-sprite-loader').loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        win: {
          icon: './public/app.ico',
          target: [
            {
              target: 'nsis', // 利用nsis制作安装程序
              arch: [
                'x64', // 64位
                'ia32'// 32位
              ]
            }
          ]
        },
        mac: {
          icon: './public/app.png'
        },
        linux: { // linux
          icon: './public/icon.icns'
        },
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          installerIcon: './public/app.ico', // 安装图标
          uninstallerIcon: './public/app.ico', // 卸载图标
          installerHeaderIcon: './public/app.ico', // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: '廉情信息报告表' // 图标名称
        },
        publish: ['github'],
        copyright: 'Copyright © 2020', // 版权信息
        appId: 'cn.com.watone.app',
        productName: '廉情信息报告表'
      }
    },
    // i18n config
    i18n: {
      locale: 'zh',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
