
import dayjs from 'dayjs'
const formatDate = (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (value) {
    return dayjs(value).format(format)
  } else {
    return ''
  }
}
const formatDay = (value, format = 'YYYY-MM-DD') => {
  if (value) {
    return dayjs(value).format(format)
  } else {
    return ''
  }
}
const install = Vue => {
  Vue.prototype.$formatDay = formatDay
  Vue.filter('dateYear', value =>
    value ? formatDate(value, 'YYYY') : ''
  )
  Vue.filter('dateMonth', value => value ? formatDate(value, 'YYYY-MM') : '')
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default { install }
