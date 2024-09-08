import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'index',
      component: () => import('@/views/home/IndexView.vue'),
      children: [
        {
          path: '',
          name: 'delayTopic',
          component: () => import('@/views/delayTopic/delayTopic.vue')
        }, {
          path: '/delayMonitor',
          name: 'delayMonitorView',
          component: () => import('@/views/delayMonitor/delayMonitorView.vue')
        }, {
          path: 'forget',
          name: 'welcome-forget',
          component: () => import('@/components/welcome/ForgetPage.vue')
        }
      ]
    }
  ]
})

export default router
