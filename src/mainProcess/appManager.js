import { Tray } from 'electron'

// management
import EventManager from './events'
import WindowManager from './windows'
import MenuManager from './menus'

// plugins
import Translator from './plugins/translator'

class AppManager {
  constructor () {
    // 翻译器
    this.translator = new Translator()

    // 窗口管理器，主要负责管理、创建窗口
    // Window manager, mainly responsible for managing and creating windows
    this.windowManager = new WindowManager(this)

    // 菜单管理器，主要负责获取菜单对象
    // Menu manager, mainly responsible for get the menu object
    this.menuManager = new MenuManager(this)

    // 事件管理器，主要负责初始化ipc、app事件
    // Event manager, mainly responsible for initializing ipc, app events
    this.eventManager = new EventManager(this)
  }

  // 初始化app，创建窗口及托盘
  // Initialize the app, create windows and tray
  initApp () {
    this.windowManager.createAll()
    this.createAppTray()
  }

    // 初始化创建打印页面
  // Initialize the app, create windows and tray
  // createPrintWin (router) {
  //   console.log('🐛:: AppManager -> createPrintWin -> router', router)
  //   this.windowManager.createPrintWin(router)
  // }

  languageChange (lang) {
    this.translator.changeLang(lang)

    // 重新设置托盘菜单（为了变更语言）
    // Reset the language of the tray menu
    this.setAppTrayMenu()
  }

  // 创建托盘
  createAppTray () {
    if (!this.tray) {
      // eslint-disable-next-line no-undef
      this.tray = new Tray(`${__static}/app.ico`)
      this.tray.setToolTip('运行中！\nStill Working!')
      this.setAppTrayMenu()
    }
  }

  // 创建托盘菜单
  setAppTrayMenu () {
    const menu = this.menuManager.AppTrayMenu()
    this.tray.setContextMenu(menu)
  }
}

export default AppManager
