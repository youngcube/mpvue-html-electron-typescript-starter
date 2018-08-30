import Vue from 'vue'
import router from '@/utils/router'
import Router from 'vue-router'
import store from '@/store'

Vue.config.productionTip = false
Vue.use(Router)

const MyApp = require('./app-web.vue').default

new Vue({
  router,
  store,
  ...MyApp,
}).$mount('#app')
