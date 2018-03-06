const routes = [{
  path: '/',
  name: 'home',
  component: () => import('@/views/layout')
}, {
  path: '/layout',
  name: 'test',
  component: () => import('@/views/layout'),
  children: [{
    path: '/test',
    name: 'test',
    component: () => import('@/views/test')
  }]
}, {
  path: '/login',
  name: 'login',
  component: () => import('@/views/login')
}]

export default routes
