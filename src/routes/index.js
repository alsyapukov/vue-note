import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/vue-note/',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import('@/pages/Main')
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      props: true,
      component: () => import('@/pages/Edit')
    }
  ]
})
