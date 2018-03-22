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
import instance from '@/server'
import Indicator from '@/components/indicator'

Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(vuex)
Vue.use(Router)
Vue.use(Indicator)
Vue.use(ElementUI, {size: 'small'})

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
const router = new Router(_router)
const store = new vuex.Store(_store)

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.user.token) { next() } else { next({path: '/login', query: {redirect: to.fullPath}}) }
  } else {
    next()
  }
})

// http request interceptors
instance.axios.interceptors.request.use(config => {
  Indicator.open()
  config.headers.token = ''
  return config
}, error => {
  // indicator.close()
  return Promise.reject(error)
})

instance.axios.interceptors.response.use(response => {
  Indicator.close()
  return response
}, error => {
  Indicator.close()
  if (error.response && error.response !== undefined) {
    switch (error.response.status) {
      case 401:
      case 403:
        if (router.currentRoute.name !== 'login') {
          router.replace({path: '/login'})
        }
        break
    }
  }
  return Promise.reject(error)
})

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
