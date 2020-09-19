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
import dayjs from 'dayjs'
import $backend from '@/backend'
const ipc = require('electron').ipcRenderer
const { dialog } = require('electron').remote
const formatDay = (value, format = 'YYYY-MM-DD') => {
  if (value) {
    return dayjs(value).format(format)
  } else {
    return ''
  }
}
Vue.component('svg-icon', SvgIcon)
Vue.prototype.$backend = $backend
Vue.prototype.$ipc = ipc
Vue.prototype.$dialog = dialog
Vue.prototype.$formatDay = formatDay
Vue.prototype.$db = db
Vue.prototype.$utils = utils
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini' })
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
