// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import vuex from 'vuex'
import filters from './filters'
import directives from './directives'
import router from './router'
// import store from './store'

Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(vuex)
Vue.use(ElementUI)

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
