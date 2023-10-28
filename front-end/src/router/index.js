import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../views/editPage.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'noPage',
      component: () => import('../views/noPage.vue')
    }
  ]
})

export default router
