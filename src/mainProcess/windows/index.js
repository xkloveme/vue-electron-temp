import MainWindow from './mainWindow'
// import pdfWindow from './mainWindow/pdf.js'

class WindowManager {
  constructor () {
    this.mainWindow = new MainWindow()
    // this.pdfWindow = new pdfWindow()
  }

  // 创建所有窗口
  createAll () {
    this.mainWindow.createWindow()
  }
  // 创建打印窗口
  createPrintWin (router) {
    this.mainWindow.createMiniWindow(router)
  }
}
export default WindowManager
