// import gank from './gank'
// import ssyer from './ssyer'
// import douban from './douban'
// import netease from './netease'
// const options = {gank, ssyer, douban, netease}

let _childs = []
// Object.keys(options).forEach(key => {
//   Array.prototype.push.apply(_childs, options[key])
// })

let _routers = []
const requireRouters = require.context('.', false, /\.js$/)
requireRouters.keys().forEach(fileName => {
  if (fileName === './index.js' || fileName === './routes.js') return

  // const routerName = fileName.replace(/\.\/|\.js/g, '')
  // console.log(routerName)
  _routers = [..._routers, ...requireRouters(fileName).default]
})
_childs = _routers
// console.dir(_routers)

const routes = [{
  path: '/',
  name: 'home',
  component: () => import('@/views/layout')
}, {
  path: '/layout',
  name: 'layout',
  component: () => import('@/views/layout'),
  children: [{
    path: '/table',
    name: 'table',
    component: () => import('@/views/tables')
  }, {
    path: '/form',
    name: 'form',
    component: () => import('@/views/form')
  }, ..._childs]
}, {
  path: '/login',
  name: 'login',
  component: () => import('@/views/login')
}]

export default routes
