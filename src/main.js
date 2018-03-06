// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import vuex from 'vuex'
import * as filters from './filters'
import directives from './directives'
import _router from './router'
import _store from './store'

Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(vuex)
Vue.use(Router)
Vue.use(ElementUI)

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
const router = new Router(_router)
const store = new vuex.Store(_store)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
