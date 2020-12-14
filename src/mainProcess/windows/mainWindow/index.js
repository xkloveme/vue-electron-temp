import { app, BrowserWindow, Menu ,dialog} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import pkg from './../../.../../../../package.json'
const version = pkg.version
const productName = pkg.productName
class MainWindow {
  constructor (win) {
    // win代表electron窗口实例
    // win is this electron window instance
    this.win = win
    // this.pdfwin = win
    // this.router = 'pdf'
  }

  initBrowserPage () {
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      this.win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
      if (!process.env.IS_TEST) {
        // 开发环境下自启动开发者工具
        // start developer tools in the development environment
        this.win.webContents.openDevTools({ mode: 'right' })
      }
    } else {
      createProtocol('app')
      this.win.loadURL('app://./index.html')
    }

    this.win.on('closed', () => {
      this.win = null
    })
  }

  createWindow () {
    if (!this.win) {
      this.win = new BrowserWindow({
        width: 1300,
        height: 800,
        minWidth: 1200,
        minHeight: 770,
        title: '廉情信息报告表',
        webPreferences: {
          // 设为false允许跨域
          webSecurity: false,
          nodeIntegration: true
        },
        // eslint-disable-next-line no-undef
        // icon: `${__static}/app.ico`,
        frame: true
      })

      // 初始化浏览器页面
      this.initBrowserPage()

      // 设置窗口菜单
      this.setWindowMenu(this.win)
    }
  }
  // initMiniBrowserPage () {
  //   if (!process.env.IS_TEST) {
  //     // 开发环境下自启动开发者工具
  //     // start developer tools in the development environment
  //     this.pdfwin.webContents.openDevTools({ mode: 'right' })
  //   }
  //   // this.pdfwin.loadURL(`app://./index.html#/pdf`)
  //   createProtocol('app')
  //   this.pdfwin.loadURL(router)
  //   // this.pdfwin.loadURL(`https://bilibili.com/`)

  //   this.pdfwin.on('closed', () => {
  //     this.pdfwin = null
  //   })
  // }
  // createMiniWindow (router) {
  //   console.log('🐛:: MainWindow -> createMiniWindow -> router', router)
  //   this.router=router
  //   if (!this.pdfwin) {
  //     this.pdfwin = new BrowserWindow({
  //       width: 1300,
  //       height: 1000,
  //       minWidth: 1200,
  //       minHeight: 770,
  //       // parent: this.win,
  //       title: '廉情信息报告打印',
  //       frame: true,
  //       webPreferences: {
  //         // 设为false允许跨域
  //         webSecurity: false,
  //         nodeIntegration: true
  //       }
  //     })
  //     // this.pdfwin.loadURL(`app://./index.html/#/pdf`)
  //     // this.pdfwin.loadURL(`https://bilibili.com/`)
  //     // this.pdfwin.on('closed', () => {
  //     //   this.pdfwin = null
  //     // })
  //     // 初始化浏览器页面
  //     this.initMiniBrowserPage()
  //   }
  // }

  setWindowMenu (win) {
    // if (process.platform === 'darwin') {
    const template = [
      {
        label: '廉情信息报告表',
        submenu: [
          {
            label: `关于${app.getName()}`,
            accelerator: 'CmdOrCtrl+I',
            click () {
              dialog.showMessageBox({
                title: productName,
                message: `欢迎使用${productName}`,
                detail: version,
                type: 'info'
              })
              win.webContents.send('action', 'about')
            }
          },
          { label: '刷新', role: 'reload' },
          { label: '隐藏', role: 'hide' },
          { type: 'separator' },
          { label: '退出', role: 'close', accelerator: 'CmdOrCtrl+Q' }
        ]
      },
      {
        label: '文件',
        submenu: [
          {
            label: '打开',
            role: 'open',
            accelerator: 'CmdOrCtrl+O',
            click () {
              win.webContents.send('action', 'open')
            }
          },
          // {
          //   label: '保存',
          //   role: 'save',
          //   accelerator: 'CmdOrCtrl+S',
          //   click () {
          //     win.webContents.send('action', 'save')
          //   }
          // },
          {
            label: '新建',
            role: 'newSave',
            accelerator: 'CmdOrCtrl+N',
            click () {
              win.webContents.send('action', 'new')
            }
          }
        ]
      }
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    // } else {
    //   Menu.setApplicationMenu(null)
    // }
  }
}

export default MainWindow
