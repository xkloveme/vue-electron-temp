
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
  Vue.filter('filterSelect', (value,option) => {
    let str = ''
    // console.log('🐛:: Object.prototype.toString.call(option)', Object.prototype.toString.call(option))
    if(Object.prototype.toString.call(option)==="[object Object]"){
      str= option[value]
    }else{
      option.map(item=>{
        if(item.key===value){
          str=item.value
        }
      })
    }
    return str
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default { install }
