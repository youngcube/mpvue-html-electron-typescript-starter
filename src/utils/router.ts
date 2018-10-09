import Router, { RouteConfig } from 'vue-router'
import index from '@/pages/index/index.vue'
import store from '@/store'
import { AppUrls } from '@/utils/consts'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: index,
  },
]

const router = new Router({
  routes,
})

export default router
