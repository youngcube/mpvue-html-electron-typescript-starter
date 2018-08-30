import Router, { RouteConfig } from 'vue-router'
import index from '@/pages/index/index.vue'
import store from '@/pages/store/index.vue'
import { AppUrls } from '@/utils/consts'

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: index,
  },
  {
    path: AppUrls.STORE,
    component: store,
  },
]

const router = new Router({
  routes: routes,
})

export default router
