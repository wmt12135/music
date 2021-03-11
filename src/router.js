import { createWebHistory, createRouter } from "vue-router"
import Home from './views/Home.vue'
import SongListDetail from './views/SongListDetail.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/songListDetail',
      name: 'SongListDetail',
      component: SongListDetail
    },
    {
      path: '/:catchAll(.*)',
      name: "404",
      component: Home
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },
})

export default router
