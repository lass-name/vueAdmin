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
  }]
}, {
  path: '/login',
  name: 'login',
  component: () => import('@/views/login')
}]

export default routes
