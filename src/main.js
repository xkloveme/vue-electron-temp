// vue入口文件 / vue entry file
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import SvgIcon from 'components/svgIcon/index.vue'
import 'components/svgIcon/index.js'
import i18n from './i18n'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import db from './db'
import * as utils from './utils'
import $backend from '@/backend'
import filter from './filter.js'
const ipc = require('electron').ipcRenderer
const { dialog } = require('electron').remote
import pkg from './../package.json'
const version = pkg.version
import LicenseKeyboard from 'vue-license-keyboard';
import 'vue-license-keyboard/lib/vue-license-keyboard.css';
var JSZip = require("jszip");
Vue.component('svg-icon', SvgIcon)
Vue.prototype.$backend = $backend
Vue.prototype.$ipc = ipc
Vue.prototype.$dialog = dialog
Vue.prototype.$db = db
Vue.prototype.$utils = utils
Vue.prototype.$version = version
// 未完成填报导出
Vue.prototype.$exportWt = function () {
  let form = store.getters.getUser
  console.log('🐛 ~ file: main.js ~ line 33 ~ form', form)
  // 初始化一个zip打包对象
  var zip = new JSZip();
  // 创建一个被用来打包的文件
  zip.file("user.json", JSON.stringify(form));
  if (form.password) {
    zip.file("password", form.password);
  }
  // 把打包内容异步转成blob二进制格式
  zip.generateAsync({ type: "blob" }).then(function (content) {
    var filename = "「未完成填报」" + form.name + form.idCard + ".wt";
    // 创建隐藏的可下载链接
    var eleLink = document.createElement("a");
    eleLink.download = filename;
    eleLink.style.display = "none";
    // 下载内容转变成blob地址
    eleLink.href = URL.createObjectURL(content);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
  });
}
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini' })
Vue.use(filter)
Vue.use(LicenseKeyboard)
// Navigation guard (interceptor) , executes code before each jump of the router
// 导航守卫（拦截器），在router每次跳转前执行
router.beforeEach((to, from, next) => {
  // code
  next()
})

// executes code every time a jump is completed
// 在router每次跳转完成后执行
router.afterEach(() => {
  // code
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
