import Vue from 'vue'
import VueRouter from 'vue-router'
import pages from './pages'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: pages
})
