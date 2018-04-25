import gank from './gank'
import ssyer from './ssyer'
import douban from './douban'
import netease from './netease'
const options = {gank, ssyer, douban, netease}

let _childs = []
Object.keys(options).forEach(key => {
  Array.prototype.push.apply(_childs, options[key])
})

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
